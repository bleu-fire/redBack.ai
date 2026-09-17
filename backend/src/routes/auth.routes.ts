import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();

// Endpoints d l'authentification
router.post('/register', register);
router.post('/login', login);

export default router;

