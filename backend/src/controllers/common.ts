import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

export const checkPaginationParams = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const paginationSchema = Joi.object({
    q: Joi.string(),
    page: Joi.number(),
    limit: Joi.number(),
    order_by: Joi.string()
  });

  try {
    await paginationSchema.validateAsync(req.query, { abortEarly: false });

    next();
  } catch (error) {
    res.status(400).send({
      errors: error.details
    });
  }
};
