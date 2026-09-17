import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();

// 1. Middlewares global
app.use(express.json());

// 2. Routes
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'redBack.ai API khddama bikhir!',
    timestamp: new Date().toISOString(),
  });
});

// Routes API  Auth
app.use('/api/auth', authRoutes);


// 4. Global Error Handler (huwa l-kher ga3)
app.use(errorHandler);

export default app;
