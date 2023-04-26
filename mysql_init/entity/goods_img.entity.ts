import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

enum GoodsImgType {
  BANNER = "banner",
  DETAIL = "detail",
  COMMENT = "comment",
}

@Entity()
export class GoodsImg {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: string;

  @Column({ type: "varchar", length: 250, nullable: false })
  goods_img_url: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  goods_img_description: string;

  @Column({ type: "tinyint", unsigned: true, nullable: false })
  goods_img_order: number;

  @Column({
    type: "enum",
    enum: GoodsImgType,
    nullable: false,
  })
  goods_img_type: GoodsImgType;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  add_time: Date;

  @Index()
  @Column({ type: "bigint", unsigned: true })
  goods_spu_id: string;
}
