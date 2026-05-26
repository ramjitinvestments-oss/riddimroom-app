import express from "express";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.error("Failed to load Vite in dev mode:", e);
    }
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');

    // 1. Static Assets (Vite assets)
    app.use('/assets', express.static(path.join(distPath, 'assets'), {
      immutable: true,
      maxAge: '1y',
      fallthrough: false
    }));

    // 2. Specific Root Assets (PWA, Favicon, etc.)
    const rootAssets = ['/manifest.json', '/sw.js', '/favicon.ico', '/icon.svg', '/robots.txt'];
    rootAssets.forEach(asset => {
      app.get(asset, (req, res) => {
        res.sendFile(path.join(distPath, asset));
      });
    });

    // 3. Root index.html
    app.get('/', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });

    // 4. API (Minimal health check)
    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', time: new Date().toISOString() });
    });

    // 5. Catch-all for SPA routing
    // Ensures all paths (like /live, /share/:id, or any custom route) fallback to index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'), (err) => {
        if (err) {
          console.error("Internal routing error:", err);
          res.status(500).send("App error");
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
