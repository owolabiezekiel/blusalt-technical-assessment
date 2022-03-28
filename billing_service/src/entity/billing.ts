import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ColumnNumericTransformer } from "../util/decimal_transformer";

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: number;

  @Column("numeric", {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  amount!: number;

  @Column({ default: "pending" })
  status: string;
}
