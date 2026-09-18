import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { config } from '../config/env';
import { AppError } from '../middlewares/error.middleware';

// Fonction kat-générer JWT token
const signToken = (id: string): string => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn as any,
  });
};

// 1. REGISTER 
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    // check if email already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('Had l-email deja mste3mel!', 400));
    }

    // creat user if  email not use befor
    const newUser = await User.create({
      name,
      email,
      password,
    });
    // creat token 
    const token = signToken(newUser._id.toString());

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// 2. LOGIN 
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('pleas enter the password 400', 400));
    }

    // search for the email and get password with it 
    const user = await User.findOne({ email })

    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError('email or the password is wrong', 401));
    }

    const token = signToken(user._id.toString());

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
