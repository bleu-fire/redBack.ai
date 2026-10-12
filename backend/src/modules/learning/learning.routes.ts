import { Router } from 'express';
import { learningController } from './learning.controller';

const router = Router();

router.get('/modules', learningController.getAllModules);
router.get('/modules/:id', learningController.getModuleById);

export default router;
