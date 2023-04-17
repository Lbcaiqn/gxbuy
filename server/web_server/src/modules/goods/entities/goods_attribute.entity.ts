import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Attribute } from './attribute.entity';
import { GoodsSpu } from './goods_spu.entity';

@Entity()
export class GoodsAttribute {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  _id: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  goods_instance_value: string;

  @ManyToOne(() => Attribute, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'attr_id' })
  attribute: Attribute;

  @ManyToOne(() => GoodsSpu, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'goods_spu_id' })
  goods_spu: GoodsSpu;
}
