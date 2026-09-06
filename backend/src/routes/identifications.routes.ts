import { Router } from 'express';
import {
  createIdentification,
  getAllIdentifications,
  getIdentificationById,
} from '../controllers/identifications.controller';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.post('/', upload.single('image'), createIdentification);
router.get('/', getAllIdentifications);
router.get('/:id', getIdentificationById);

export default router;
