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

  // Directory for isolated multi-user progress storage in data/users
  const usersDir = path.join(process.cwd(), 'data', 'users');
  if (!fs.existsSync(usersDir)) {
    fs.mkdirSync(usersDir, { recursive: true });
  }

  // Helper to sanitize userId for safe filesystem paths
  const getSafeUserId = (rawId: string): string => {
    return (rawId || 'anonymous').replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 64);
  };

  const getUserFilePath = (userId: string): string => {
    const safe = getSafeUserId(userId);
    return path.join(usersDir, `${safe}.json`);
  };

  const createInitialUserData = (userId: string, displayName?: string, avatar?: string) => {
    const name = displayName?.trim() || (userId.startsWith('user_') ? `Learner ${userId.slice(5, 9)}` : userId);
    return {
      userId,
      displayName: name,
      avatar: avatar || '🌳',
      progress: 0,
      xp: 0,
      score: 0,
      completedTopics: [],
      completedVisualizations: [],
      quizScore: null,
      quizProgress: { completed: 0, total: 10 },
      quizState: null,
      gameScore: 0,
      gameXP: 0,
      achievements: [],
      videoCompleted: false,
      learningStreak: 0,
      timelineTimestamps: {},
      joinedTime: Date.now(),
      currentNav: 'home',
      currentTopicId: 'basics',
      settings: {
        isDarkMode: true,
        isSoundOn: true,
      },
      lastUpdated: Date.now(),
    };
  };

  // Parse JSON bodies for API endpoints
  app.use(express.json());

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // ==========================================
  // MULTI-USER ISOLATED ENDPOINTS
  // ==========================================

  // 1. List user profiles (summaries only, zero data leakage)
  app.get('/api/users', (_req, res) => {
    try {
      const files = fs.readdirSync(usersDir).filter((f) => f.endsWith('.json'));
      const summaries = files.map((file) => {
        try {
          const content = JSON.parse(fs.readFileSync(path.join(usersDir, file), 'utf8'));
          return {
            userId: content.userId || file.replace('.json', ''),
            displayName: content.displayName || 'Learner',
            avatar: content.avatar || '🌳',
            progress: typeof content.progress === 'number' ? content.progress : 0,
            xp: typeof content.xp === 'number' ? content.xp : 0,
            lastActive: content.lastUpdated || Date.now(),
          };
        } catch {
          return null;
        }
      }).filter(Boolean);

      res.json({ users: summaries });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to list users: ' + err.message });
    }
  });

  // 2. Get specific user's isolated data
  app.get('/api/users/:userId', (req, res) => {
    try {
      const { userId } = req.params;
      const filePath = getUserFilePath(userId);

      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return res.json(data);
      }

      // New user first visit -> initialize strictly isolated 0% data
      const initial = createInitialUserData(userId);
      fs.writeFileSync(filePath, JSON.stringify(initial, null, 2), 'utf8');
      return res.json(initial);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to get user data: ' + err.message });
    }
  });

  // 3. Create or switch to a user profile
  app.post('/api/users', (req, res) => {
    try {
      const { userId, displayName, avatar } = req.body || {};
      const targetId = userId?.trim() || `user_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
      const filePath = getUserFilePath(targetId);

      if (fs.existsSync(filePath)) {
        const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (displayName) existing.displayName = displayName.trim();
        if (avatar) existing.avatar = avatar;
        existing.lastUpdated = Date.now();
        fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');
        return res.json(existing);
      }

      const initial = createInitialUserData(targetId, displayName, avatar);
      fs.writeFileSync(filePath, JSON.stringify(initial, null, 2), 'utf8');
      return res.status(201).json(initial);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to create user: ' + err.message });
    }
  });

  // 4. Update specific user's progress
  app.put('/api/users/:userId/progress', (req, res) => {
    try {
      const { userId } = req.params;
      const updates = req.body || {};
      const filePath = getUserFilePath(userId);

      let currentData: any;
      if (fs.existsSync(filePath)) {
        currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } else {
        currentData = createInitialUserData(userId, updates.displayName, updates.avatar);
      }

      // Merge only allowed user-specific fields
      const merged = {
        ...currentData,
        ...updates,
        userId, // Enforce current userId cannot be changed
        lastUpdated: Date.now(),
      };

      fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf8');
      res.json({ success: true, user: merged });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to save user progress: ' + err.message });
    }
  });

  // 5. Reset ONLY this user's data (leaving all other users completely untouched)
  app.post('/api/users/:userId/reset', (req, res) => {
    try {
      const { userId } = req.params;
      const filePath = getUserFilePath(userId);

      let displayName = undefined;
      let avatar = undefined;
      if (fs.existsSync(filePath)) {
        try {
          const prev = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          displayName = prev.displayName;
          avatar = prev.avatar;
        } catch {}
      }

      // Reset to 0% progress and empty values for this user
      const resetData = createInitialUserData(userId, displayName, avatar);
      fs.writeFileSync(filePath, JSON.stringify(resetData, null, 2), 'utf8');

      res.json({ success: true, user: resetData });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to reset user: ' + err.message });
    }
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
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
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
