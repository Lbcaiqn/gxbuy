import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GoodsSpu } from './goods_spu.entity';
import { GoodsSku } from './goods_sku.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  _id: string;

  @Column({ type: 'varchar', length: 10, unique: true, nullable: false })
  shop_name: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  shop_logo: string;

  @OneToMany(() => GoodsSpu, gspu => gspu.shop)
  goods_spu: GoodsSpu[];

  @OneToMany(() => GoodsSku, gsku => gsku.shop)
  goods_sku: GoodsSku[];
}
