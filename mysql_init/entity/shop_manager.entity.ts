import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class ShopManager {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  shop_manager_account: string;

  @Column({ type: "varchar", length: 100, nullable: false, select: false })
  shop_manager_password: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  shop_manager_name: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  add_time: Date;

  @Index()
  @Column({ type: "bigint", unsigned: true })
  shop_id: string;
}
