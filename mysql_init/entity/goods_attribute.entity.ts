import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class GoodsAttribute {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  goods_instance_value: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  add_time: Date;

  @Index()
  @Column({ type: "bigint", unsigned: true })
  goods_spu_id: string;

  @Index()
  @Column({ type: "bigint", unsigned: true })
  attr_id: string;
}
