import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Health Route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'ProMetrics' });
  });

  // Explicit handlers for sitemap and robots just in case of environment routing edge cases
  app.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml; charset=UTF-8');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://prometrics.ca/</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://prometrics.ca/services</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://prometrics.ca/pricing</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://prometrics.ca/contact</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
  });

  app.get('/robots.txt', (req, res) => {
    res.header('Content-Type', 'text/plain; charset=UTF-8');
    res.send(`User-agent: *
Allow: /
Sitemap: https://prometrics.ca/sitemap.xml`);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    
    // Serve static files from the dist directory
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
