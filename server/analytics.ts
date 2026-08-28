import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import geoip from 'geoip-lite';
import type { Request } from 'express';

const DATA_DIR = path.join(process.cwd(), 'data');
const LOG_FILE = path.join(DATA_DIR, 'analytics.jsonl');
const PATH_PATTERN = /^\/[a-zA-Z0-9\-_/]{0,120}$/;
const MAX_LOG_LINES = 200_000;

fs.mkdirSync(DATA_DIR, { recursive: true });

export interface PageViewEvent {
  ts: string;
  path: string;
  referrer: string;
  country: string;
  device: 'desktop' | 'mobile' | 'tablet' | 'bot' | 'other';
  visitorHash: string;
}

function classifyDevice(ua: string): PageViewEvent['device'] {
  const s = ua.toLowerCase();
  if (!s) return 'other';
  if (/bot|crawler|spider|slurp|bingpreview|facebookexternalhit/.test(s)) return 'bot';
  if (/ipad|tablet/.test(s)) return 'tablet';
  if (/mobile|iphone|android/.test(s)) return 'mobile';
  return 'desktop';
}

function hashVisitor(ip: string): string {
  const salt = process.env.ANALYTICS_SALT || 'prometrics-default-salt';
  const dayBucket = new Date().toISOString().slice(0, 10);
  return crypto.createHash('sha256').update(`${ip}|${dayBucket}|${salt}`).digest('hex').slice(0, 16);
}

function normalizeReferrer(rawReferrer: string, host: string): string {
  if (!rawReferrer) return 'direct';
  try {
    const url = new URL(rawReferrer);
    return url.hostname === host ? 'direct' : url.hostname;
  } catch {
    return 'direct';
  }
}

export function recordPageView(req: Request): void {
  const body = (req.body ?? {}) as Record<string, unknown>;
  const rawPath = typeof body.path === 'string' ? body.path : '/';
  const safePath = PATH_PATTERN.test(rawPath) ? rawPath : '/other';
  const referrerInput = typeof body.referrer === 'string' ? body.referrer : req.get('referer') || '';

  const ip = req.ip || req.socket.remoteAddress || '';
  const geo = ip ? geoip.lookup(ip) : null;

  const event: PageViewEvent = {
    ts: new Date().toISOString(),
    path: safePath,
    referrer: normalizeReferrer(referrerInput, req.hostname),
    country: geo?.country || 'XX',
    device: classifyDevice(req.get('user-agent') || ''),
    visitorHash: hashVisitor(ip),
  };

  fs.appendFile(LOG_FILE, JSON.stringify(event) + '\n', () => {});
}

function readEvents(): PageViewEvent[] {
  if (!fs.existsSync(LOG_FILE)) return [];
  const raw = fs.readFileSync(LOG_FILE, 'utf-8');
  const lines = raw.split('\n').filter(Boolean).slice(-MAX_LOG_LINES);
  const events: PageViewEvent[] = [];
  for (const line of lines) {
    try {
      events.push(JSON.parse(line));
    } catch {
      continue;
    }
  }
  return events;
}

function countBy(list: PageViewEvent[], key: (e: PageViewEvent) => string) {
  const map = new Map<string, number>();
  for (const e of list) {
    const k = key(e);
    map.set(k, (map.get(k) || 0) + 1);
  }
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

function uniqueVisitors(list: PageViewEvent[]): number {
  return new Set(list.map((e) => e.visitorHash)).size;
}

export function getAnalyticsSummary() {
  const events = readEvents();
  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;
  const within = (days: number) => events.filter((e) => now - new Date(e.ts).getTime() <= days * DAY);

  const today = within(1);
  const last7 = within(7);
  const last30 = within(30);

  const viewsByDay: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const key = new Date(now - i * DAY).toISOString().slice(0, 10);
    viewsByDay.push({ date: key, count: events.filter((e) => e.ts.slice(0, 10) === key).length });
  }

  return {
    totalViews: events.length,
    viewsToday: today.length,
    viewsLast7Days: last7.length,
    viewsLast30Days: last30.length,
    uniqueVisitorsToday: uniqueVisitors(today),
    uniqueVisitorsLast7Days: uniqueVisitors(last7),
    uniqueVisitorsLast30Days: uniqueVisitors(last30),
    viewsByCountry: countBy(last30, (e) => e.country).slice(0, 15),
    viewsByPage: countBy(last30, (e) => e.path).slice(0, 15),
    topReferrers: countBy(last30, (e) => e.referrer).slice(0, 10),
    deviceBreakdown: countBy(last30, (e) => e.device),
    viewsByDay,
  };
}
