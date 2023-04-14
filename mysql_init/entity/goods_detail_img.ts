import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GoodsDetailImg {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  _id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  goods_spu_id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  goods_detail_img: string;

  @Column({ type: 'tinyint', unsigned: true, nullable: false })
  goods_detail_img_order: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  goods_detail_img_description: string;
}
