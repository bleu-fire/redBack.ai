import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import apiRouter from './routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

export function createApp(): Application {
  const app = express();

  // Global Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static uploads serving
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  // Root health check
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', service: 'redback-backend-express' });
  });

  // API v1 Routes
  app.use('/api/v1', apiRouter);

  // 404 & Error Handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
