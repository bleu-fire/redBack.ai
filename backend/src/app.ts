import { IdentificationController, identificationController } from './modules/Identification/identification.controller';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes';
import speciesRoutes from './modules/species/species.routes';
import identificationRoutes from './modules/species/species.routes';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();

app.use(express.json());

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
app.use('api/identifaction',identificationRoutes)


// 4. Global 
app.use(errorHandler);

export default app;
