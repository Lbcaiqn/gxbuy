import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GoodsBannerImg {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  _id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  goods_spu_id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  goods_banner_img: string;

  @Column({ type: 'tinyint', unsigned: true, nullable: false })
  goods_banner_img_order: number;
}
