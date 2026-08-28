import crypto from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';

export const SESSION_COOKIE = 'pm_session';
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

export function isAnalyticsConfigured(): boolean {
  return Boolean(process.env.ANALYTICS_PASSWORD && process.env.ANALYTICS_SESSION_SECRET);
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', process.env.ANALYTICS_SESSION_SECRET as string).update(payload).digest('hex');
}

export function createSessionToken(): string {
  const payload = String(Date.now() + SESSION_TTL_MS);
  return `${payload}.${sign(payload)}`;
}

export function isValidSessionToken(token: unknown): boolean {
  if (typeof token !== 'string') return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const signatureBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (signatureBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(signatureBuf, expectedBuf)) return false;

  return Number(payload) > Date.now();
}

export function checkPassword(candidate: unknown): boolean {
  if (typeof candidate !== 'string') return false;
  const actual = process.env.ANALYTICS_PASSWORD as string;
  const candidateBuf = Buffer.from(candidate);
  const actualBuf = Buffer.from(actual);
  if (candidateBuf.length !== actualBuf.length) return false;
  return crypto.timingSafeEqual(candidateBuf, actualBuf);
}

export function requireAnalyticsAuth(req: Request, res: Response, next: NextFunction): void {
  if (!isAnalyticsConfigured()) {
    res.status(503).json({ error: 'Analytics dashboard is not configured on this deployment.' });
    return;
  }
  if (!isValidSessionToken(req.cookies?.[SESSION_COOKIE])) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }
  next();
}
