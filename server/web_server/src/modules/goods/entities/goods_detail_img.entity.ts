import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { GoodsSpu } from './goods_spu.entity';

@Entity()
export class GoodsDetailImg {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  _id: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  goods_detail_img: string;

  @Column({ type: 'tinyint', unsigned: true, nullable: false })
  goods_detail_img_order: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  goods_detail_img_description: string;

  @ManyToOne(() => GoodsSpu, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'goods_spu_id' })
  goods_spu: GoodsSpu;
}
