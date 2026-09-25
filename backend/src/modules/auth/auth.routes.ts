import { Router } from 'express';
import { register, login, getAllUsers } from './auth.controller';

const router = Router();

// Endpoints
router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);

export default router;

