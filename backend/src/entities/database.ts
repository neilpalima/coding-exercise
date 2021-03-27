import { Sequelize } from 'sequelize-typescript';

import {
  ProductModel,
  AuctionModel,
  AutoBidModel
} from '../models';

let connection: Sequelize;

export const connect = async (): Promise<Sequelize> => {
  const {
    APP_DEBUG,
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD
  } = process.env;

  const appDebug = APP_DEBUG === 'true';

  const enableLogging: boolean | ((message: any) => void) = appDebug && console.log;

  connection = new Sequelize(DB_DATABASE as string, DB_USERNAME as string, DB_PASSWORD as string, {
    host: DB_HOST as string,
    port: parseInt(DB_PORT as string),
    dialect: 'mysql',
    logging: enableLogging,
    benchmark: appDebug
  });

  // Add models.
  connection.addModels([
    ProductModel,
    AuctionModel,
    AutoBidModel
  ]);

  await connection.authenticate();

  /* istanbul ignore else */
  if (appDebug) {
    console.log('Successfully connected to the database!');
  }

  return connection;
};

export const getConnection = (): Sequelize => connection;
