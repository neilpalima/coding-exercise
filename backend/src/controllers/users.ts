import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import * as jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;

export const checkLoginFields = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const loginSchema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .required(),
    password: Joi.string()
      .min(3)
      .required()
  });

  try {
    await loginSchema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    res.status(400).send({
      errors: error.details
    });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (username !== password) {
      res.status(401).send({
        message: 'Incorrect username/password.'
      });
      return;
    }

    const token = jwt.sign({
      username
    }, SECRET_KEY as string, {
      expiresIn: '1h'
    });

    res.status(200).send({
      message: 'Successfully logged in.',
      token
    });
  } catch (error) {
    next(error);
  }
};
