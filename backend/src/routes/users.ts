import * as express from 'express';

import { usersController } from '../controllers';

const router = express.Router();

router.post('/login',
  usersController.checkLoginFields,
  usersController.login
);

export default router;
