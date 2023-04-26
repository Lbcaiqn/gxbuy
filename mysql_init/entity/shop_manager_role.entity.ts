import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class ShopManagerRole {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  shop_manager_role_name: string;

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
