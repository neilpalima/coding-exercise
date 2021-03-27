import { Request } from 'express';
import { Order } from 'sequelize';

export interface RequestWithJwtData extends Request {
  jwtData?: any;
}

export interface ResponseErrorInterface extends Error {
  status?: number;
}

export interface QueryInterface {
  limit?: number;
  page?: number;
  order_by?: string;
  q?: string;
}

export interface PaginationParams {
  limit: number;
  page: number;
  offset: number;
  order?: Order;
}

export interface PaginationQueryResults <T> {
  total: number;
  limit: number;
  page: number;
  pages: number;
  results: T[]
}
