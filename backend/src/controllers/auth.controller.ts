import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { config } from '../config/env';
import { AppError } from '../middlewares/error.middleware';
import { AuthRequest } from '../middlewares/auth.middleware';

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { fullname, email, password, avatarUrl } = req.body;

    if (!fullname || !email || !password) {
      throw new AppError('Fullname, email, and password are required', 400, 'VALIDATION_ERROR');
    }

    if (password.length < 6) {
      throw new AppError('Password must be at least 6 characters long', 400, 'VALIDATION_ERROR');
    }

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new AppError('User with this email already exists', 409, 'CONFLICT');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      fullname,
      email: email.toLowerCase(),
      passwordHash,
      avatarUrl,
    });

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn as any },
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Email and password are required', 400, 'VALIDATION_ERROR');
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new AppError('Invalid credentials', 401, 'UNAUTHORIZED');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401, 'UNAUTHORIZED');
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn as any },
    );

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const user = await UserModel.findById(req.user.id).select('-passwordHash');
    if (!user) {
      throw new AppError('User not found', 404, 'NOT_FOUND');
    }

    res.status(200).json({
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    next(error);
  }
}

export function getStatus(_req: Request, res: Response): void {
  res.status(200).json({
    status: 'Auth service operational',
    timestamp: new Date().toISOString(),
  });
}
