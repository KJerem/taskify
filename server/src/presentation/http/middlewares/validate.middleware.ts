import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ErrorUtil } from '@utils/error.util';

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body); 
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        next(
          ErrorUtil.validationError(
            `Validation failed: ${JSON.stringify(validationErrors)}`
          )
        );
      } else {
        next(error);
      }
    }
  };
