import { Router } from 'express';
import authRoutes from './auth.routes';
import speciesRoutes from './species.routes';
import identificationRoutes from './identifications.routes';
import learningRoutes from './learning.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/species', speciesRoutes);
router.use('/identifications', identificationRoutes);
router.use('/learning', learningRoutes);

// Health check endpoint
router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'redback-backend-express',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;
