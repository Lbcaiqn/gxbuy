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

  @Column({ type: "int", unsigned: true, nullable: false, default: 0 })
  shopcart_total_all: number;

  @Column({ type: "int", unsigned: true, nullable: false, default: 0 })
  order_total_all: number;

  @Column({ type: "int", unsigned: true, nullable: false, default: 0 })
  order_total_wait_paid: number;

  @Column({ type: "int", unsigned: true, nullable: false, default: 0 })
  order_total_wait_shipped: number;

  @Column({ type: "int", unsigned: true, nullable: false, default: 0 })
  order_total_wait_receive: number;

  @Column({ type: "int", unsigned: true, nullable: false, default: 0 })
  order_total_wait_comment: number;

  @Column({ type: "int", unsigned: true, nullable: false, default: 0 })
  order_total_finish: number;

  @Column({ type: "int", unsigned: true, nullable: false, default: 0 })
  order_total_cancel: number;

  @Column({ type: "int", unsigned: true, nullable: false, default: 0 })
  order_total_invalid: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  add_time: Date;
}
