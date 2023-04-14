import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GoodsAttribute {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  _id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  goods_spu_id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  attr_id: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  goods_instance_value: string;

  
}
