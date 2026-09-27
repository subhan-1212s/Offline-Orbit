import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from the server folder
dotenv.config({ path: path.join(__dirname, '.env') });

import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import lessonRoutes from './routes/lessons.js';
import quizRoutes from './routes/quizzes.js';
import progressRoutes from './routes/progress.js';
import aiRoutes from './routes/ai.js';
import syncRoutes from './routes/sync.js';
import emailRoutes from './routes/email.js';
import classRoutes from './routes/classes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
  'https://offline-orbit-sm.vercel.app'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o)) || origin.includes('vercel.app')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/classes', classRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Offline Orbit Backend API',
    timestamp: new Date().toISOString(),
    aiKeyConfigured: !!(process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('xxx')),
    mongoDBConfigured: !!(process.env.MONGODB_URI && process.env.MONGODB_URI.trim() !== ''),
    brevoKeyConfigured: !!(process.env.BREVO_API_KEY && !process.env.BREVO_API_KEY.includes('xxx'))
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Offline Orbit Server running on port ${PORT}`);
  console.log(`📡 Health Check available at http://localhost:${PORT}/api/health`);
});
