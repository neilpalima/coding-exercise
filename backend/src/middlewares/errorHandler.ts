
import { NextFunction, Request, Response } from 'express';
import { ResponseErrorInterface } from '../contracts';

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const err: ResponseErrorInterface = new Error('Not Found');
  err.status = 404;
  next(err);
};

/* istanbul ignore next */
export const developmentErrors = (err: ResponseErrorInterface, req: Request, res: Response): void => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  };
  res.status(err.status || 500).send(errorDetails);
};

/* istanbul ignore next */
export const productionErrors = (err: ResponseErrorInterface, req: Request, res: Response): void => {
  console.error(err.message);
  res.status(err.status || 500).send({
    message: err.message
  });
};
