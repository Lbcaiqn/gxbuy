import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Shop } from './shop.entity';
import { Category } from '@/modules/category/entities/category.entity';
import { GoodsSpu } from './goods_spu.entity';

@Entity()
export class GoodsSku {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  _id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  goods_sku_name: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  goods_sku_img: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    unsigned: true,
    nullable: false,
  })
  goods_sku_price: string;

  @Column({ type: 'int', unsigned: true, nullable: false, default: 0 })
  goods_sku_sales: number;

  @Column({ type: 'int', unsigned: true, nullable: false, default: 0 })
  goods_sku_stock: number;

  @Column({ type: 'json', nullable: true })
  sku_sales_attrs: JSON;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  add_time: Date;

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

  @ManyToOne(() => Shop, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @ManyToOne(() => GoodsSpu, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'goods_spu_id' })
  goods_spu: GoodsSpu;
}
