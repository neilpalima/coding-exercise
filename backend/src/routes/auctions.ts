import * as express from 'express';

import { auctionsController, commonController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = express.Router();

router.use(authMiddleware.verifyToken);

router.get('/',
  commonController.checkPaginationParams,
  auctionsController.getAuctionList);
router.get('/:id', auctionsController.getAuctionDetails);
router.post('/:id/bid',
  auctionsController.checkBidFields,
  auctionsController.bid
);

export default router;
