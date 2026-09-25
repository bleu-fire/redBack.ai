import { Router } from 'express';
import speciesController from './species.controller';

const router = Router();

router.post('/', speciesController.createSpecies);
router.get('/', speciesController.getAllSpecies);
router.get('/:id', speciesController.getSpeciesById);
router.patch('/:id', speciesController.updateSpecies);

export default router;

