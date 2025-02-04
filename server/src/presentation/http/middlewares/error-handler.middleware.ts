import { Request, Response, NextFunction } from 'express';
import { AppError } from '@utils/error.util';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
    });
  } else {
    console.error('Unhandled Error:', err);
    res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
    });
  }
}
