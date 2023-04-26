import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class UserBrowseHistory {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  add_time: Date;

  @Index()
  @Column({ type: "bigint", unsigned: true })
  user_id: string;

  @Index()
  @Column({ type: "bigint", unsigned: true })
  goods_spu_id: string;
}
