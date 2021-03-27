import { AutoBidModel } from '../models';

export const getHighestAutoBids = async (id: number, limit?: number): Promise<AutoBidModel[]> => {
  const where = { auction_id: id };
  return await AutoBidModel.findAll({
    where,
    order: [['max_bid', 'desc']],
    limit
  });
};

export const addAutoBid = async (id: number, bidder: string, maxBid: number): Promise<void> => {
  const where = {
    auction_id: id,
    bidder
  };
  const [instance, created] = await AutoBidModel.findOrCreate({
    where,
    defaults: {
      max_bid: maxBid
    } as any
  });

  if (!created) {
    await instance.update({ max_bid: maxBid });
  }
};
