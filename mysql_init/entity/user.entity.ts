import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: string;

  @Column({ type: "varchar", length: 50, unique: true, nullable: false })
  user_account: string;

  @Column({ type: "varchar", length: 100, nullable: false, select: false })
  user_password: string;

  @Column({ type: "varchar", length: 50, unique: true, nullable: false })
  user_name: string;

  @Column({ type: "varchar", length: 250, nullable: false })
  user_icon: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  add_time: Date;
}
