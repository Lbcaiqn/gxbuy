import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

enum BannerType {
  PC = "PC",
  MOBILE = "mobile",
}

@Entity()
export class HomeBanner {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  _id: string;

  @Column({ type: "varchar", length: 250, nullable: false })
  img: string;

  @Column({ type: "varchar", length: 250, nullable: false })
  to_url: string;

  @Column({
    type: "enum",
    enum: BannerType,
    nullable: false,
  })
  type: BannerType;
}
