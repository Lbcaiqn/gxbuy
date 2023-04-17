import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { GoodsAttribute } from './goods_attribute.entity';
import { Category } from '@/modules/category/entities/category.entity';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  _id: string;

  @Column({ type: 'varchar', length: 25, nullable: false })
  attr_name: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  attr_values: string;

  @ManyToOne(() => Category, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'cid' })
  cid_msg: Category;

  @ManyToOne(() => Category, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'c1id' })
  c1id_msg: Category;

  @ManyToOne(() => Category, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'c2id' })
  c2id_msg: Category;

  @ManyToOne(() => Category, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'c3id' })
  c3id_msg: Category;

  @OneToMany(() => GoodsAttribute, ga => ga.attribute)
  goods_attribute: GoodsAttribute[];
}
