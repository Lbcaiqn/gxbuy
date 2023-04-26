import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shop {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: string;

  @Column({ type: "varchar", length: 50, unique: true, nullable: false })
  shop_account: string;

  @Column({ type: "varchar", length: 100, nullable: false, select: false })
  shop_password: string;

  @Column({ type: "varchar", length: 50, unique: true, nullable: false })
  shop_name: string;

  @Column({ type: "varchar", length: 250, nullable: false })
  shop_logo: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  add_time: Date;
}
