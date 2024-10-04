import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { HttpException } from '../exceptions/HttpException';

export function validationMiddleware<T>(type: any, value: string = 'body'): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToClass(type, req[value]);
    validate(dtoObject).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
}
