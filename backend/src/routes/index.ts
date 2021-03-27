import * as express from 'express';

import userRoutes from './users';
import auctionRoutes from './auctions';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auctions', auctionRoutes);

export default router;
