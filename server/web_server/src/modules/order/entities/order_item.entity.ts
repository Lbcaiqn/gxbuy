import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn, In } from 'typeorm';
import { OrderInformation } from './order_information.entity';
import { User } from '@/modules/user/entities/user.entity';
import { Shop } from '@/modules/shop/entities/shop.entity';
import { GoodsSpu } from '@/modules/goods/entities/goods_spu.entity';
import { GoodsSku } from '@/modules/goods/entities/goods_sku.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  _id: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  shop_name: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  shop_logo: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  goods_spu_name: string;

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

  @Column({ type: 'json', nullable: true })
  sku_sales_attrs: JSON;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  add_time: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  update_time: Date;

  @Index()
  @ManyToOne(() => OrderInformation, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'order_information_id' })
  order_information: OrderInformation;

  @Index()
  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Index()
  @ManyToOne(() => Shop, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @Index()
  @ManyToOne(() => GoodsSpu, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'goods_spu_id' })
  goods_spu: GoodsSpu;

  @Index()
  @ManyToOne(() => GoodsSku, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'goods_sku_id' })
  goods_sku: GoodsSku;
}
