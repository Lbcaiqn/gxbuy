import { Entity, Column, PrimaryGeneratedColumn, Index, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { Category } from './category.entity';
import { GoodsAttribute } from '@/modules/goods/entities/goods_attribute.entity';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  _id: string;

  @Column({ type: 'varchar', length: 25, nullable: false })
  attr_name: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  attr_values: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  add_time: Date;

  @Column({ type: 'smallint', unsigned: true, nullable: true })
  cid: number;

  @Column({ type: 'smallint', unsigned: true, nullable: true })
  c1id: number;

  @Column({ type: 'smallint', unsigned: true, nullable: true })
  c2id: number;

  @Column({ type: 'smallint', unsigned: true, nullable: true })
  c3id: number;

  @Index()
  @ManyToOne(() => Category, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'cid' })
  cid_msg: Category;

  @Index()
  @ManyToOne(() => Category, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'c1id' })
  c1id_msg: Category;

  @Index()
  @ManyToOne(() => Category, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'c2id' })
  c2id_msg: Category;

  @Index()
  @ManyToOne(() => Category, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'c3id' })
  c3id_msg: Category;

  @OneToMany(() => GoodsAttribute, ga => ga.attribute)
  goods_attribute: GoodsAttribute[];
}
