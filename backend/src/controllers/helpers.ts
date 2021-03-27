import { ParsedUrlQuery } from 'querystring';
import { Order } from 'sequelize';

import { PaginationParams } from '../contracts';

export const getPaginationParams = (query: ParsedUrlQuery, allowedFieldsMapping?: Record<string, any>): PaginationParams => {
  const { order_by: orderBy } = query;
  const limit = parseInt(query.limit as string) || 10;
  const page = parseInt(query.page as string) || 1;
  const offset = limit * (page - 1) || 0;

  let order: Order | undefined;

  if (orderBy && allowedFieldsMapping) {
    const [field, ordering] = (orderBy as string).split(':');
    if (allowedFieldsMapping[field]) {
      order = [[allowedFieldsMapping[field], ordering.toUpperCase()]];
    }
  }

  return {
    limit,
    page,
    offset,
    order
  };
};
