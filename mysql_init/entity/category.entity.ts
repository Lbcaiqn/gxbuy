import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: "smallint", unsigned: true })
  _id: number;

  @Column({ type: "tinyint", unsigned: true, nullable: false })
  cat_level: number;

  @Column({ type: "varchar", length: 10, nullable: false })
  cat_name: string;

  @Column({ type: "varchar", length: 250, nullable: true })
  cat_icon: string;

  @Index()
  @Column({ type: "smallint", unsigned: true, nullable: true })
  cat_pid: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  add_time: Date;
}
