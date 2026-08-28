import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { createServer as createViteServer } from 'vite';
import { recordPageView, getAnalyticsSummary } from './server/analytics';
import {
  SESSION_COOKIE,
  isAnalyticsConfigured,
  createSessionToken,
  isValidSessionToken,
  checkPassword,
  requireAnalyticsAuth,
} from './server/analyticsAuth';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // Cloud Run sits behind a load balancer; trust the first proxy hop so
  // req.ip / req.secure reflect the real client instead of the proxy.
  app.set('trust proxy', 1);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: isProd ? ["'self'"] : ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:'],
          connectSrc: ["'self'"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          frameAncestors: ["'none'"],
          upgradeInsecureRequests: isProd ? [] : null,
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );

  app.use(express.json({ limit: '10kb' }));
  app.use(cookieParser());

  // API Health Route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'ProMetrics' });
  });

  // --- Privacy-respecting first-party analytics ---
  // Page views are logged with a country (via IP geolocation) and a
  // one-way, daily-rotating hash of the visitor's IP — the raw IP is
  // never persisted.
  const trackLimiter = rateLimit({ windowMs: 60_000, limit: 30, standardHeaders: true, legacyHeaders: false });
  const loginLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 5, standardHeaders: true, legacyHeaders: false });
  const analyticsApiLimiter = rateLimit({ windowMs: 60_000, limit: 60, standardHeaders: true, legacyHeaders: false });

  app.post('/api/track', trackLimiter, (req, res) => {
    recordPageView(req);
    res.status(204).end();
  });

  app.post('/api/analytics/login', loginLimiter, (req, res) => {
    if (!isAnalyticsConfigured()) {
      res.status(503).json({ error: 'Analytics dashboard is not configured on this deployment.' });
      return;
    }
    if (!checkPassword(req.body?.password)) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }
    res.cookie(SESSION_COOKIE, createSessionToken(), {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 12 * 60 * 60 * 1000,
      path: '/',
    });
    res.json({ ok: true });
  });

  app.post('/api/analytics/logout', (req, res) => {
    res.clearCookie(SESSION_COOKIE, { path: '/' });
    res.json({ ok: true });
  });

  app.get('/api/analytics/session', (req, res) => {
    res.json({
      configured: isAnalyticsConfigured(),
      authenticated: isValidSessionToken(req.cookies?.[SESSION_COOKIE]),
    });
  });

  app.get('/api/analytics/summary', analyticsApiLimiter, requireAnalyticsAuth, (req, res) => {
    res.json(getAnalyticsSummary());
  });

  // Vite middleware for development
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');

    // Serve static files (including robots.txt, sitemap.xml, favicons from public/) from dist
    app.use(express.static(distPath));

    // Fallback all other client-side routing matching to index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
