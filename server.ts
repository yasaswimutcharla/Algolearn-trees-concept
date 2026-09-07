import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

function getFallbackDSAReply(userText: string): string {
  const lower = userText.toLowerCase();
  if (lower.includes('bst') || lower.includes('search tree')) {
    return 'In a Binary Search Tree (BST), every node follows the BST invariant: all values in the left subtree are smaller than the node value, and all values in the right subtree are greater. Average search, insertion, and deletion run in O(log n) time!';
  }
  if (lower.includes('traversal') || lower.includes('inorder') || lower.includes('preorder') || lower.includes('postorder') || lower.includes('level order')) {
    return 'Tree traversals include:\n• Inorder (Left → Root → Right): yields sorted order in BSTs.\n• Preorder (Root → Left → Right): ideal for copying/serializing trees.\n• Postorder (Left → Right → Root): ideal for deletion/freeing nodes.\n• Level-order (BFS): explores layer by layer using a Queue.';
  }
  if (lower.includes('quiz') || lower.includes('score')) {
    return "You can test your knowledge anytime in the 'Quiz' section! Each question includes 3 progressive hints to guide your reasoning.";
  }
  if (lower.includes('video') || lower.includes('visualize')) {
    return "Visit the 'Visualize' tab to observe interactive tree visualizers, examine structural properties, or upload complete video lessons.";
  }
  if (lower.includes('avl') || lower.includes('balance') || lower.includes('red black')) {
    return 'Self-balancing trees like AVL and Red-Black trees maintain a maximum height of O(log n) by performing rotations whenever an imbalance occurs during insertion or deletion.';
  }
  if (lower.includes('heap')) {
    return 'A Binary Heap is a complete binary tree satisfying the heap property (Min-Heap: parent ≤ children; Max-Heap: parent ≥ children). They are the foundation of Priority Queues and HeapSort.';
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return 'Hello! 👋 What tree topic would you like to explore today? Tree Terminology, Binary Trees, BSTs, Traversals, or Applications?';
  }
  return 'Trees are hierarchical, non-linear data structures consisting of nodes connected by edges. Check out the Learn and Visualize tabs for interactive step-by-step guides on Binary Trees, BSTs, and Traversals!';
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse JSON payloads for API endpoints
  app.use(express.json());

  // Directory for persistent lesson videos in public/videos
  const videosDir = path.join(process.cwd(), 'public', 'videos');
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
  }

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // AI Chat Assistant endpoint powered by Gemini
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body || {};
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message string is required' });
      }

      const ai = getAIClient();
      if (ai) {
        try {
          const contents: any[] = [];
          if (Array.isArray(history)) {
            for (const item of history.slice(-6)) {
              if (item && item.text && (item.sender === 'user' || item.sender === 'bot')) {
                contents.push({
                  role: item.sender === 'user' ? 'user' : 'model',
                  parts: [{ text: item.text }],
                });
              }
            }
          }
          contents.push({
            role: 'user',
            parts: [{ text: message }],
          });

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents,
            config: {
              systemInstruction:
                'You are AlgoLearn Assistant, an encouraging, concise, and expert tutor specialized in Tree Data Structures and Algorithms (Binary Trees, BSTs, Traversals, Tree Properties, AVL, Heaps, B-Trees, etc.). Provide clear explanations, ASCII tree diagrams when helpful, and short code snippets when requested. Keep answers friendly and focused within 2-4 short paragraphs.',
            },
          });

          if (response && response.text) {
            return res.json({ reply: response.text });
          }
        } catch (geminiErr: any) {
          console.warn('Gemini chat error, using fallback:', geminiErr?.message || geminiErr);
        }
      }

      // Contextual fallback response
      const fallback = getFallbackDSAReply(message);
      res.json({ reply: fallback });
    } catch (err: any) {
      console.error('Chat error:', err);
      res.status(500).json({ error: 'Failed to process chat message' });
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

  // Remove lesson video endpoint
  app.delete('/api/remove-video', (_req, res) => {
    const videoFile = path.join(videosDir, 'lesson.mp4');
    const metaFile = path.join(videosDir, 'meta.json');
    try {
      if (fs.existsSync(videoFile)) fs.unlinkSync(videoFile);
      if (fs.existsSync(metaFile)) fs.unlinkSync(metaFile);
      const distVideosDir = path.join(process.cwd(), 'dist', 'videos');
      if (fs.existsSync(path.join(distVideosDir, 'lesson.mp4'))) {
        fs.unlinkSync(path.join(distVideosDir, 'lesson.mp4'));
      }
      if (fs.existsSync(path.join(distVideosDir, 'meta.json'))) {
        fs.unlinkSync(path.join(distVideosDir, 'meta.json'));
      }
    } catch (err) {
      console.warn('Could not unlink video files:', err);
    }
    res.json({ success: true, hasVideo: false });
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
