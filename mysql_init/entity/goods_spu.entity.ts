import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class GoodsSpu {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: string;

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
  goods_first_sku_price: string;

  @Column({ type: "int", unsigned: true, nullable: false, default: 0 })
  goods_sku_total_sales: number;

  @Column({ type: "int", unsigned: true, nullable: false, default: 0 })
  goods_sku_total_stock: number;

  @Column({ type: "int", unsigned: true, nullable: false, default: 0 })
  goods_spu_total_favorite: number;

  @Column({ type: "json", nullable: true })
  spu_sales_attrs: JSON;

  @Index()
  @Column({ type: "smallint", unsigned: true })
  cid: number;

  @Index()
  @Column({ type: "smallint", unsigned: true })
  c1id: number;

  @Index()
  @Column({ type: "smallint", unsigned: true })
  c2id: number;

  @Index()
  @Column({ type: "smallint", unsigned: true })
  c3id: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  add_time: Date;

  @Index()
  @Column({ type: "bigint", unsigned: true })
  shop_id: string;
}
