import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { auctionsRepository, autoBidRepository } from '../repositories';
import { RequestWithJwtData } from '../contracts';

import * as helpers from './helpers';

export const checkBidFields = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const schema = Joi.object({
    bid: Joi.number()
      .required(),
    max_bid: Joi.number()
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false, allowUnknown: true });

    next();
  } catch (error) {
    res.status(400).send({
      errors: error.details
    });
  }
};

export const getAuctionList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query = req.query as any;

    const allowedFieldsMapping = {
      highest_bid: 'highest_bid'
    };
    const options = {
      ...helpers.getPaginationParams(query, allowedFieldsMapping)
    };

    const auctions = await auctionsRepository.getAllAuctions(query.q, options);

    res.status(200).send(auctions);
  } catch (error) {
    next(error);
  }
};

export const getAuctionDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params as any;

    const auction = await auctionsRepository.getAuctionDetails(id);

    if (!auction) {
      res.status(404).send({ message: 'Auction not found' });
      return;
    }

    res.status(200).send(auction);
  } catch (error) {
    next(error);
  }
};

export const bid = async (req: RequestWithJwtData, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = +req.params.id;
    const { max_bid: maxBid, bid } = req.body;
    const { username } = req.jwtData;
    const auction = await auctionsRepository.getDetails(id);

    if (!auction) {
      res.status(404).send({ message: 'Auction not found' });
      return;
    }

    const isHighestBidder = await auctionsRepository.isAuctionHighestBidder(id, username);

    if (isHighestBidder) {
      res.status(409).send({ message: 'You are the highest bidder right now.' });
      return;
    }

    const [isUpdated] = await auctionsRepository.updateBid(id, bid, username);

    if (!isUpdated) {
      res.status(400).send({ message: 'Bid is lower than current bid or bidding is already closed.' });
      return;
    }

    if (maxBid) {
      await autoBidRepository.addAutoBid(id, username, maxBid);
    }

    await auctionsRepository.updateHighestBid(id);
    res.status(200).send({ message: 'Successfully made a bid.' });
  } catch (error) {
    next(error);
  }
};
