import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { profileRouter } from './routes/profile.routes';
import { competencyRouter } from './routes/competency.routes';
import { assessmentRouter } from './routes/assessment.routes';
import { skillGapRouter } from './routes/skillgap.routes';
import { learningPathRouter } from './routes/learningpath.routes';
import { courseRouter } from './routes/course.routes';
import { nsstaProgrammeRouter } from './routes/nssta.routes';
import { materialRouter } from './routes/material.routes';
import { questionRouter } from './routes/question.routes';
import { quizRouter } from './routes/quiz.routes';
import { recommendationRouter } from './routes/recommendation.routes';
import { analyticsRouter } from './routes/analytics.routes';
import { aiRouter } from './routes/ai.routes';
import { notificationRouter } from './routes/notification.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// CORS
// CORS - Allow any origin (Vercel, local dev, custom domains) with credentials
app.use(cors({
  origin: (origin, callback) => callback(null, origin || true),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'StatSaksham API',
    version: '1.0.0',
    prototype: true,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/competencies', competencyRouter);
app.use('/api/assessments', assessmentRouter);
app.use('/api/skill-gaps', skillGapRouter);
app.use('/api/learning-paths', learningPathRouter);
app.use('/api/courses', courseRouter);
app.use('/api/nssta', nsstaProgrammeRouter);
app.use('/api/materials', materialRouter);
app.use('/api/questions', questionRouter);
app.use('/api/quizzes', quizRouter);
app.use('/api/recommendations', recommendationRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/ai', aiRouter);
app.use('/api/notifications', notificationRouter);

// Serve Frontend in Production / Fullstack Deployment if dist exists
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(frontendDistPath));

// Error handler
app.use(errorHandler);

// SPA fallback or 404 handler
app.get('*', (req, res) => {
  const indexPath = path.join(frontendDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).json({ success: false, message: 'Route not found' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 StatSaksham Backend running on port ${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
  console.log(`🤖 AI Provider: ${process.env.AI_PROVIDER || 'mock'}`);
  console.log(`🛡️  Prototype Mode: ${process.env.PROTOTYPE_MODE === 'true' ? 'ENABLED' : 'DISABLED'}\n`);
});

export default app;
