import { Router } from 'express';
import {
  createSpecies,
  getAllSpecies,
  searchSpecies,
  getSpeciesById,
  updateSpecies,
  deleteSpecies,
} from '../controllers/species.controller';

const router = Router();

router.post('/', createSpecies);
router.get('/', getAllSpecies);
router.get('/search', searchSpecies);
router.get('/:id', getSpeciesById);
router.patch('/:id', updateSpecies);
router.delete('/:id', deleteSpecies);

export default router;
