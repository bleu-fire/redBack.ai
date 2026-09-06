import { Router } from 'express';
import {
  getAllTopics,
  getTopicBySlug,
  createTopic,
} from '../controllers/learning.controller';

const router = Router();

router.get('/', getAllTopics);
router.get('/topics', getAllTopics);
router.get('/topics/:slug', getTopicBySlug);
router.get('/:slug', getTopicBySlug);
router.post('/', createTopic);
router.post('/topics', createTopic);

export default router;
