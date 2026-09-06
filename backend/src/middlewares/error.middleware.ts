import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  public statusCode: number;
  public code: string;

  constructor(message: string, statusCode = 400, code = 'BAD_REQUEST') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const statusCode = err.statusCode || 500;
  const code = err.code || (statusCode === 500 ? 'INTERNAL_SERVER_ERROR' : 'ERROR');
  const message = err.message || 'An unexpected error occurred';

  if (process.env.NODE_ENV !== 'production' && statusCode === 500) {
    console.error('Unhandled Error:', err);
  }

  res.status(statusCode).json({
    statusCode,
    code,
    message,
  });
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    statusCode: 404,
    code: 'NOT_FOUND',
    message: `Endpoint ${req.method} ${req.originalUrl} not found`,
  });
}
