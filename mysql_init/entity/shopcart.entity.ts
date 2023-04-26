import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class Shopcart {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: string;

  @Column({ type: "boolean", nullable: false })
  selected: boolean;

  @Column({ type: "int", nullable: false })
  quantity: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  add_time: Date;

  @Index()
  @Column({ type: "bigint", unsigned: true })
  user_id: string;

  @Index()
  @Column({ type: "bigint", unsigned: true })
  shop_id: string;

  @Index()
  @Column({ type: "bigint", unsigned: true })
  goods_spu_id: string;

  @Index()
  @Column({ type: "bigint", unsigned: true })
  goods_sku_id: string;
}
