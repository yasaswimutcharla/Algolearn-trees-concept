import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Directory for persistent lesson videos in public/videos
  const videosDir = path.join(process.cwd(), 'public', 'videos');
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
  }

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Query if a final lesson video has been uploaded and stored on the server
  app.get('/api/video-status', (_req, res) => {
    const videoFile = path.join(videosDir, 'lesson.mp4');
    const metaFile = path.join(videosDir, 'meta.json');

    if (fs.existsSync(videoFile)) {
      let meta: { name?: string; size?: string; uploadedAt?: string } = {};
      try {
        if (fs.existsSync(metaFile)) {
          meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
        }
      } catch {}

      const stats = fs.statSync(videoFile);
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(1) + ' MB';

      res.json({
        hasVideo: true,
        url: '/videos/lesson.mp4',
        name: meta.name || 'Tree DSA Complete Visual Lesson',
        size: meta.size || sizeInMB,
        uploadedAt: meta.uploadedAt || stats.mtime.toISOString(),
      });
    } else {
      res.json({ hasVideo: false });
    }
  });

  // Upload final lesson video endpoint (supports raw streaming of any size)
  app.post('/api/upload-video', (req, res) => {
    const rawHeaderName = (req.headers['x-file-name'] as string) || '';
    let fileName = 'Tree DSA Complete Visual Lesson';
    try {
      fileName = decodeURIComponent(rawHeaderName) || 'Tree DSA Complete Visual Lesson';
    } catch {
      fileName = rawHeaderName || 'Tree DSA Complete Visual Lesson';
    }
    const fileSize = (req.headers['x-file-size'] as string) || '';
    const targetPath = path.join(videosDir, 'lesson.mp4');
    const metaPath = path.join(videosDir, 'meta.json');

    const writeStream = fs.createWriteStream(targetPath);
    req.pipe(writeStream);

    writeStream.on('finish', () => {
      const stats = fs.statSync(targetPath);
      const computedSize = fileSize || (stats.size / (1024 * 1024)).toFixed(1) + ' MB';
      const meta = {
        name: fileName,
        size: computedSize,
        url: '/videos/lesson.mp4',
        uploadedAt: new Date().toISOString(),
      };
      try {
        fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
      } catch (err) {
        console.error('Failed to write meta.json:', err);
      }

      // Also mirror to dist/videos if dist directory exists (e.g. in production)
      const distVideosDir = path.join(process.cwd(), 'dist', 'videos');
      if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
        if (!fs.existsSync(distVideosDir)) {
          fs.mkdirSync(distVideosDir, { recursive: true });
        }
        try {
          fs.copyFileSync(targetPath, path.join(distVideosDir, 'lesson.mp4'));
          fs.copyFileSync(metaPath, path.join(distVideosDir, 'meta.json'));
        } catch (copyErr) {
          console.error('Failed to copy to dist/videos:', copyErr);
        }
      }

      res.json({
        success: true,
        hasVideo: true,
        url: '/videos/lesson.mp4',
        ...meta,
      });
    });

    writeStream.on('error', (err) => {
      console.error('Error writing video file:', err);
      res.status(500).json({ error: 'Failed to write video file: ' + err.message });
    });
  });

  // Serve videos statically with Range requests support (needed for video seek/scrubbing)
  app.use('/videos', express.static(videosDir, {
    acceptRanges: true,
    setHeaders: (res) => {
      res.setHeader('Accept-Ranges', 'bytes');
    },
  }));

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
