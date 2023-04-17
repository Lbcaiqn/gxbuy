import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Shop } from './shop.entity';
import { Category } from '@/modules/category/entities/category.entity';
import { GoodsSku } from './goods_sku.entity';
import { GoodsBannerImg } from './goods_banner_img.entity';
import { GoodsDetailImg } from './goods_detail_img.entity';
import { GoodsAttribute } from './goods_attribute.entity';

@Entity()
export class GoodsSpu {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  _id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  goods_spu_name: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  goods_spu_main_img: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    unsigned: true,
    nullable: false,
  })
  goods_first_sku_price: string;

  @Column({ type: 'int', unsigned: true, nullable: false, default: 0 })
  goods_sku_total_sales: number;

  @Column({ type: 'int', unsigned: true, nullable: false, default: 0 })
  goods_sku_total_stock: number;

  @Column({ type: 'json', nullable: true })
  spu_sales_attrs: JSON;

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

  @OneToMany(() => GoodsSku, gsku => gsku.goods_spu)
  goods_sku: GoodsSku[];

  @OneToMany(() => GoodsBannerImg, gbanner => gbanner.goods_spu)
  goods_banner_img: GoodsBannerImg[];

  @OneToMany(() => GoodsDetailImg, gdetail => gdetail.goods_spu)
  goods_detail_img: GoodsDetailImg[];

  @OneToMany(() => GoodsAttribute, gattr => gattr.goods_spu)
  goods_attribute: GoodsAttribute[];
}
