import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { UserModel } from '../models/user.model';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    fullname: string;
  };
}

export async function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        statusCode: 401,
        code: 'UNAUTHORIZED',
        message: 'No authorization token provided',
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string; email: string };

    const user = await UserModel.findById(decoded.id).select('-passwordHash');
    if (!user) {
      res.status(401).json({
        statusCode: 401,
        code: 'UNAUTHORIZED',
        message: 'User no longer exists',
      });
      return;
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      fullname: user.fullname,
    };

    next();
  } catch (error) {
    res.status(401).json({
      statusCode: 401,
      code: 'INVALID_TOKEN',
      message: 'Invalid or expired authentication token',
    });
  }
}
