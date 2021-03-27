import { Op } from 'sequelize';
import * as moment from 'moment';

import { PaginationParams, PaginationQueryResults } from '../contracts';
import { AuctionModel, AutoBidModel, ProductModel } from '../models';

export const getDetails = async (id: number | string): Promise<AuctionModel | null> => {
  const where = { id };
  return await AuctionModel.findOne({ where });
};

export const getAllAuctions = async (q: string, pagination: PaginationParams): Promise<PaginationQueryResults<AuctionModel>> => {
  const { limit, offset, order, page } = pagination;
  const productsWhere = q
    ? {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${q}%`
            }
          },
          {
            description: {
              [Op.like]: `%${q}%`
            }
          }
        ]
      }
    : undefined;

  const productsInclude = {
    model: ProductModel,
    where: productsWhere
  };

  const [{ count: total }, results] = await Promise.all([
    AuctionModel.findAndCountAll({ include: productsInclude }),
    AuctionModel.findAll({ limit, offset, order, include: productsInclude })
  ]);

  const pages = Math.ceil(total / limit);

  return {
    total,
    limit,
    page,
    pages,
    results
  };
};

export const getAuctionDetails = async (id: number): Promise<AuctionModel | null> => {
  const where = { id };
  return await AuctionModel.findOne({
    where,
    include: [ProductModel]
  });
};

export const isAuctionHighestBidder = async (id: number, bidder: string): Promise<boolean> => {
  const where = { id, highest_bidder: bidder };
  return !!(await AuctionModel.findOne({
    where
  }));
};

export const updateBid = async (id: number, bid: number, bidder: string): Promise<[number, AuctionModel[]]> => {
  return await AuctionModel.update({
    highest_bid: bid,
    highest_bidder: bidder
  }, {
    where: {
      id,
      highest_bid: {
        [Op.lt]: bid
      },
      bid_end: {
        [Op.gte]: moment()
      }
    }
  });
};

export const updateHighestBid = async (id: number): Promise<void> => {
  const where = { id };
  const auction = await AuctionModel.findOne({
    where,
    include: {
      model: AutoBidModel,
      order: [['max_bid', 'desc']],
      limit: 2
    }
  });

  if (!auction) {
    return;
  }

  const bidding = auction.get().bidding;

  if (!bidding.length) {
    return;
  }

  const highestAutoBid = bidding[0]?.get?.();

  if (highestAutoBid.max_bid <= auction.highest_bid) {
    return;
  }

  const secondHighestAutoBid = bidding[1]?.get?.();
  const updateParams: any = {
    highest_bidder: highestAutoBid.bidder
  };

  if (!secondHighestAutoBid) {
    updateParams.highest_bid = auction.highest_bid + 1;
  } else if (secondHighestAutoBid.max_bid <= highestAutoBid.max_bid) {
    const newHighestBid = Math.max(secondHighestAutoBid.max_bid, auction.highest_bid) + 1;
    updateParams.highest_bid = newHighestBid;
  } else {
    updateParams.highest_bid = highestAutoBid.max_bid;
  }

  await auction.update(updateParams);
};
