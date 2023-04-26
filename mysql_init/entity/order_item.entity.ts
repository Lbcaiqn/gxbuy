import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: string;

  @Column({ type: "int", nullable: false })
  quantity: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  shop_name: string;

  @Column({ type: "varchar", length: 250, nullable: false })
  shop_logo: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  goods_spu_name: string;

  @Column({ type: "varchar", length: 250, nullable: false })
  goods_sku_img: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    unsigned: true,
    nullable: false,
  })
  goods_sku_price: string;

  @Column({ type: "json", nullable: true })
  sku_sales_attrs: JSON;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  add_time: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  update_time: Date;

  @Index()
  @Column({ type: "bigint", unsigned: true })
  order_information_id: string;

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
