import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class UserSearchHistory {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: string;

  @Column({ type: "varchar", length: 30, nullable: false })
  keyword: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  add_time: Date;

  @Index()
  @Column({ type: "bigint", unsigned: true })
  user_id: string;
}
