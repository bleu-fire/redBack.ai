import { Router } from 'express';
import { aiController } from './ai.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

// POST /api/ai/chat -> Instant field naturalist chat (open/contextual)
router.post('/chat', aiController.chatWithAI);

// Persistent Conversation & Message History (RAB-11) - Protected & Isolated per user
router.post('/conversations', protect, aiController.createConversation);
router.get('/conversations', protect, aiController.getUserConversations);
router.get('/conversations/:id', protect, aiController.getConversation);
router.post('/conversations/:id/messages', protect, aiController.sendMessage);
router.delete('/conversations/:id', protect, aiController.deleteConversation);

export default router;
