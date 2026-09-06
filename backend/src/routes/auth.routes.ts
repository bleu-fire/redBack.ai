import { Router } from 'express';
import { register, login, getMe, getStatus } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getMe);
router.get('/status', getStatus);

export default router;
