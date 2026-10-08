import { Router } from 'express';
import { identificationController } from './identification.controller';
import { upload } from '../../middlewares/upload.middleware';

const router = Router();

// AI Vision & Pinecone Vector Analysis endpoint
router.post('/analyze', upload.single('image'), identificationController.analyzeImage);
router.post('/detect', upload.single('image'), identificationController.analyzeImage);

router.post('/', identificationController.createIdentification);
router.get('/', identificationController.getAllIdentification);
router.get('/:id', identificationController.getIdentificationById);

export default router;