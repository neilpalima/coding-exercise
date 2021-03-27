import { Express } from 'express';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';

import routes from '../routes';
import { errorHandleMiddleware } from '../middlewares';

const server = (port: number): Express => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/', routes);

  app.use(errorHandleMiddleware.notFound);

  if (app.get('env') !== 'production') {
    app.use(errorHandleMiddleware.developmentErrors);
  }

  app.use(errorHandleMiddleware.productionErrors);

  app.listen(port, () => console.log(`server is now running on port ${port}`));

  return app;
};

export default server;
