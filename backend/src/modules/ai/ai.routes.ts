import { Router } from 'express';
import { aiController } from './ai.controller';

const router = Router();

// POST /api/ai/chat -> Naturalist AI conversation endpoint
router.post('/chat', aiController.chatWithAI);

export default router;
