import * as moment from 'moment';

import { database } from '../src/entities';
import { AuctionModel, ProductModel, AutoBidModel } from '../src/models';

const products = [
  {
    name: 'Fantastic Granite Chair',
    description: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
  },
  {
    name: 'Small Metal Shirt',
    description: 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
  },
  {
    name: 'Intelligent Plastic Shoes',
    description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
  }
];

const auctions = [
  {
    product_id: 1,
    bid_end: moment().add(30, 'minutes'),
    highest_bid: 10
  },
  {
    product_id: 2,
    bid_end: moment().add(30, 'minutes'),
    highest_bid: 5
  },
  {
    product_id: 3,
    bid_end: moment().add(2, 'hours'),
    highest_bid: 20
  },
  {
    product_id: 1,
    bid_end: moment().add(3, 'hours'),
    highest_bid: 1
  },
  {
    product_id: 2,
    bid_end: moment().add(4, 'hours'),
    highest_bid: 2
  },
  {
    product_id: 3,
    bid_end: moment().add(5, 'hours'),
    highest_bid: 3
  },
  {
    product_id: 1,
    bid_end: moment().add(1, 'days'),
    highest_bid: 11
  },
  {
    product_id: 2,
    bid_end: moment().add(2, 'days'),
    highest_bid: 8
  },
  {
    product_id: 3,
    bid_end: moment().add(3, 'days'),
    highest_bid: 6
  },
  {
    product_id: 1,
    bid_end: moment().add(1, 'days'),
    highest_bid: 5
  },
  {
    product_id: 2,
    bid_end: moment().add(2, 'days'),
    highest_bid: 5
  },
  {
    product_id: 3,
    bid_end: moment().add(3, 'days'),
    highest_bid: 5
  },
  {
    product_id: 1,
    bid_end: moment().add(10, 'days'),
    highest_bid: 5
  },
  {
    product_id: 2,
    bid_end: moment().add(10, 'days'),
    highest_bid: 5
  },
  {
    product_id: 3,
    bid_end: moment().add(10, 'days'),
    highest_bid: 5
  }
];

(async () => {
  try {
    await database.connect();

    if (process.argv.includes('--clean')) {
      await AutoBidModel.drop();
      await AuctionModel.drop();
      await ProductModel.drop();
      await database.getConnection().drop();
      await database.getConnection().sync();
    }

    await ProductModel.bulkCreate(products as any);
    await AuctionModel.bulkCreate(auctions as any);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();
