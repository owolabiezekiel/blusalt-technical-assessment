import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ColumnNumericTransformer } from "../util/decimal_transformer";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name!: string;

  @Column()
  email!: string;

  @Column()
  phone_number!: string;

  @Column()
  account_number!: string;

  @Column("numeric", {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  account_balance!: number;
}
