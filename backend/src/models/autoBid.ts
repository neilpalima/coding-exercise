import { Column, DataType, Model, PrimaryKey, Table, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';

import Auction from './auction';

@Table({
  tableName: 'auto_bid',
  timestamps: false
})

export default class AutoBid extends Model<AutoBid> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: number;

  @Column(DataType.STRING)
  public bidder!: string;

  @Column(DataType.INTEGER)
  public max_bid!: number;

  @ForeignKey(() => Auction)
  @Column(DataType.INTEGER)
  public auction_id!: number;

  @BelongsTo(() => Auction)
  public auction!: Auction;
}
