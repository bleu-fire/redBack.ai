import { Request, Response, NextFunction } from 'express';
import authService from './auth.service';

// 1. REGISTER
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      status: 'success',
      token: result.token,
      data: { user: result.user },
    });
  } catch (error) {
    next(error);
  }
};

// 2. LOGIN
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({
      status: 'success',
      token: result.token,
      data: { user: result.user },
    });
  } catch (error) {
    next(error);
  }
};

// 3. GET ALL USERS
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await authService.getAllUsers();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};