import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../modules/auth/user.model';
import { config } from '../config/env';
import { AppError } from './error.middleware';

// Bach n-typiw req.user f Express
export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    // check the token if in  Authorization header (Bearer <token>)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError('Ma3ndekch l-haq t-acceder hna, khassek dir login l-oul!', 401)
      );
    }

    // verifiw token is correct
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string };

    // verify user if is in the data base
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('Had l-user mol had l-token mabqash kayn!', 401)
      );
    }

    // send user m3a req bach nkhdmo bih  les controllers
    req.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError('Token is wrong or expired', 401));
  }
};

