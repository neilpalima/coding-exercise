import { Column, DataType, Model, PrimaryKey, Table, AutoIncrement, ForeignKey, BelongsTo, HasMany, Default } from 'sequelize-typescript';

import Product from './product';
import AutoBid from './autoBid';

@Table({
  tableName: 'auction',
  timestamps: false
})

export default class Auction extends Model<Auction> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: number;

  @Default(0)
  @Column(DataType.INTEGER)
  public highest_bid!: number;

  @Default(null)
  @Column(DataType.STRING(50))
  public highest_bidder!: string;

  @Column(DataType.DATE)
  public bid_end!: string;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  public product_id!: number;

  @BelongsTo(() => Product)
  public product!: Product;

  @HasMany(() => AutoBid)
  public bidding !: AutoBid[];
}
