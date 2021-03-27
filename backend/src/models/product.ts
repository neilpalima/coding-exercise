import { Column, DataType, Model, PrimaryKey, Table, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'product',
  timestamps: false
})

export default class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: number;

  @Column(DataType.STRING)
  public name!: string;

  @Column(DataType.STRING)
  public description!: string;
}
