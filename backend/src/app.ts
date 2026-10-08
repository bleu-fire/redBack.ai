import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes';
import speciesRoutes from './modules/species/species.routes';
import identificationRoutes from './modules/Identification/identification.routes';
import { errorHandler } from './middlewares/error.middleware';

import aiRoutes from './modules/ai/ai.routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Routes
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'redBack.ai API!',
    timestamp: new Date().toISOString(),
  });
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/species', speciesRoutes);
app.use('/api/identification', identificationRoutes);
app.use('/api/identifications', identificationRoutes);
app.use('/api/ai', aiRoutes);

// 4. Global 
app.use(errorHandler);

export default app;
