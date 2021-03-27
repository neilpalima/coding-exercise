import * as dotenv from 'dotenv';

import { server, database } from './entities';

dotenv.config();

const main = async () => {
  try {
    const port = parseInt(process.env.PORT as string) || 3000;

    await database.connect();

    server(port);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

main();
