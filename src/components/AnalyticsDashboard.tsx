import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Lock, LogOut, RefreshCw, Users, Eye, Globe2, FileText,
  Link2, Smartphone, AlertTriangle, ArrowLeft
} from 'lucide-react';

interface CountEntry {
  label: string;
  count: number;
}

interface AnalyticsSummary {
  totalViews: number;
  viewsToday: number;
  viewsLast7Days: number;
  viewsLast30Days: number;
  uniqueVisitorsToday: number;
  uniqueVisitorsLast7Days: number;
  uniqueVisitorsLast30Days: number;
  viewsByCountry: CountEntry[];
  viewsByPage: CountEntry[];
  topReferrers: CountEntry[];
  deviceBreakdown: CountEntry[];
  viewsByDay: { date: string; count: number }[];
}

const COUNTRY_NAMES: Record<string, string> = {
  CA: 'Canada', US: 'United States', GB: 'United Kingdom', FR: 'France',
  DE: 'Germany', IN: 'India', AU: 'Australia', CN: 'China', JP: 'Japan',
  BR: 'Brazil', MX: 'Mexico', NL: 'Netherlands', ES: 'Spain', IT: 'Italy',
  XX: 'Unknown',
};

function countryLabel(code: string): string {
  return COUNTRY_NAMES[code] || code;
}

function StatTile({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-brand-800 bg-white p-5 flex items-start justify-between shadow-sm">
      <div>
        <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <p className="text-2xl font-extrabold font-display text-brand-700 mt-1">{value}</p>
      </div>
      <div className="rounded-lg bg-brand-50 p-2 text-emerald-600">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
}

function BarList({ title, icon: Icon, entries, formatLabel }: {
  title: string;
  icon: React.ElementType;
  entries: CountEntry[];
  formatLabel?: (label: string) => string;
}) {
  const max = entries.length > 0 ? entries[0].count : 0;
  return (
    <div className="rounded-2xl border border-brand-800 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-emerald-600" />
        <h3 className="text-sm font-bold font-display text-brand-700">{title}</h3>
      </div>
      {entries.length === 0 ? (
        <p className="text-xs text-slate-400 font-sans">No data in the last 30 days yet.</p>
      ) : (
        <div className="space-y-2.5">
          {entries.map((entry) => (
            <div key={entry.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-brand-700 font-medium truncate max-w-[70%]">
                  {formatLabel ? formatLabel(entry.label) : entry.label}
                </span>
                <span className="text-slate-400 font-mono">{entry.count}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-brand-900 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${max > 0 ? Math.max((entry.count / max) * 100, 3) : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TrendChart({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="rounded-2xl border border-brand-800 bg-white p-6 shadow-sm">
      <h3 className="text-sm font-bold font-display text-brand-700 mb-4">Traffic — Last 30 Days</h3>
      <div className="flex items-end gap-[3px] h-32">
        {data.map((d) => (
          <div key={d.date} className="flex-1 h-full flex items-end group relative">
            <div
              className="w-full rounded-t bg-emerald-500 group-hover:bg-emerald-600 transition-colors"
              style={{ height: `${Math.max((d.count / max) * 100, d.count > 0 ? 4 : 1)}%` }}
            />
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-brand-700 text-white text-[10px] font-mono px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {d.date}: {d.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadSession = async () => {
    try {
      const res = await fetch('/api/analytics/session');
      const data = await res.json();
      setConfigured(Boolean(data.configured));
      setAuthenticated(Boolean(data.authenticated));
    } finally {
      setChecking(false);
    }
  };

  const loadSummary = async () => {
    setRefreshing(true);
    setLoadError(null);
    try {
      const res = await fetch('/api/analytics/summary');
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (!res.ok) {
        setLoadError('Failed to load analytics data.');
        return;
      }
      setSummary(await res.json());
    } catch {
      setLoadError('Network error while loading analytics data.');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    loadSummary();
    const interval = setInterval(loadSummary, 30_000);
    return () => clearInterval(interval);
  }, [authenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const res = await fetch('/api/analytics/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setPassword('');
      setAuthenticated(true);
    } else if (res.status === 503) {
      setConfigured(false);
    } else {
      setLoginError('Incorrect password.');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/analytics/logout', { method: 'POST' });
    setAuthenticated(false);
    setSummary(null);
  };

  const shell = (children: React.ReactNode) => (
    <div className="min-h-screen bg-brand-950 font-sans">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <a href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-brand-700/70 hover:text-emerald-600 transition">
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </a>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 font-display text-xs font-extrabold text-white">PM</span>
            <span className="font-display text-sm font-extrabold text-brand-700">Traffic Analytics</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );

  if (checking) {
    return shell(<p className="text-xs text-slate-400 font-mono">Loading...</p>);
  }

  if (!configured) {
    return shell(
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 flex items-start gap-3 max-w-lg">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h2 className="text-sm font-bold text-amber-800">Analytics dashboard not configured</h2>
          <p className="text-xs text-amber-700 mt-1 font-sans">
            Set the <code className="font-mono">ANALYTICS_PASSWORD</code> and <code className="font-mono">ANALYTICS_SESSION_SECRET</code> environment
            variables on the server to enable this dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return shell(
      <motion.form
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleLogin}
        className="max-w-sm mx-auto mt-12 rounded-2xl border border-brand-800 bg-white p-8 shadow-sm space-y-4"
      >
        <div className="mx-auto h-12 w-12 rounded-full bg-brand-50 text-emerald-600 border border-brand-100 flex items-center justify-center">
          <Lock className="h-5 w-5" />
        </div>
        <h2 className="text-center text-lg font-bold font-display text-brand-700">Admin sign-in</h2>
        <p className="text-center text-xs text-slate-500 font-sans">Enter the analytics password to view site traffic.</p>
        {loginError && (
          <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 text-center">{loginError}</div>
        )}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full bg-white border border-brand-800 rounded-xl py-2.5 px-4 text-sm text-brand-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-brand-700 hover:bg-slate-800 px-6 py-3 text-sm font-bold text-white shadow-lg transition cursor-pointer"
        >
          Sign in
        </button>
      </motion.form>
    );
  }

  return shell(
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold font-display text-brand-700">Website Traffic Overview</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={loadSummary}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700/70 hover:text-emerald-600 transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 transition cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </div>

      {loadError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">{loadError}</div>
      )}

      {summary && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatTile icon={Eye} label="Views Today" value={summary.viewsToday} />
            <StatTile icon={Users} label="Visitors Today" value={summary.uniqueVisitorsToday} />
            <StatTile icon={Eye} label="Views (30d)" value={summary.viewsLast30Days} />
            <StatTile icon={Users} label="Visitors (30d)" value={summary.uniqueVisitorsLast30Days} />
          </div>

          <TrendChart data={summary.viewsByDay} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BarList title="Top Countries" icon={Globe2} entries={summary.viewsByCountry} formatLabel={countryLabel} />
            <BarList title="Top Pages" icon={FileText} entries={summary.viewsByPage} />
            <BarList title="Top Referrers" icon={Link2} entries={summary.topReferrers} />
            <BarList title="Devices" icon={Smartphone} entries={summary.deviceBreakdown} formatLabel={(l) => l[0].toUpperCase() + l.slice(1)} />
          </div>

          <p className="text-[10px] text-slate-400 font-mono">
            Total views recorded since launch: {summary.totalViews}. Visitor counts are derived from a daily-rotating,
            one-way hash — no raw IP addresses are stored.
          </p>
        </>
      )}
    </div>
  );
}
