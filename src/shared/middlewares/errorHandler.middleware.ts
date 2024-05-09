import logger from '@/logging/logger';
import { HttpStatus } from '@/constants/enums';
import { Request, Response, NextFunction } from 'express';
import { HttpError, InternalServerError } from '../errors';

// middleware handle errors
export const errorhandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // http errors
  if (HttpError.isHttpError(err)) return res.status(err.status).json(err.body);

  // console on error
  logger.error(err);

  // unknown errors
  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .send(new InternalServerError(err.message).body);
};
