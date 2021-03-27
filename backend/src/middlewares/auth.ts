import { NextFunction, Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { authorization } = req.headers;

    const token = authorization?.split('Bearer ')?.[1];

    if (!token) {
      res.status(401).send({
        message: 'Unathorized access'
      });
      return;
    }

    jwt.verify(token as string, SECRET_KEY as string);

    const data = jwt.decode(token);

    (req as any).jwtData = data;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).send({
        message: 'Unathorized access'
      });
      return;
    }
    next(error);
  }
};
