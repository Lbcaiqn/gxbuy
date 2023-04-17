import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GoodsAttribute {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: string;

  @Column({ type: "bigint", unsigned: true, nullable: false })
  goods_spu_id: string;

  @Column({ type: "bigint", unsigned: true, nullable: false })
  attr_id: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  goods_instance_value: string;
}
