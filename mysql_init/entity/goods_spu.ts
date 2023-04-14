import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GoodsSpu {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: bigint;

  @Column({ type: "varchar", length: 100, nullable: false })
  goods_spu_name: string;

  @Column({ type: "varchar", length: 250, nullable: false })
  goods_spu_main_img: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    unsigned: true,
    nullable: false,
  })
  goods_first_sku_price: number;

  @Column({ type: "int", unsigned: true, nullable: false, default: 0 })
  goods_sku_total_sales: number;

  @Column({ type: "int", unsigned: true, nullable: false, default: 0 })
  goods_sku_total_stock: number;

  @Column({ type: "json", nullable: true })
  spu_sales_attrs: JSON;

  @Column({ type: "smallint", unsigned: true, nullable: false })
  cid: number;

  @Column({ type: "smallint", unsigned: true, nullable: false })
  c1id: number;

  @Column({ type: "smallint", unsigned: true, nullable: false })
  c2id: number;

  @Column({ type: "smallint", unsigned: true, nullable: false })
  c3id: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  add_time: Date;

  @Column({ type: "bigint", unsigned: true, nullable: false })
  shop_id: bigint;
}
