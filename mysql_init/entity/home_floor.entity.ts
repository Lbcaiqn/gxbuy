import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class HomeFloor {
  @PrimaryGeneratedColumn({ type: "tinyint", unsigned: true })
  _id: number;

  @Column({ type: "varchar", length: 20, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 250, nullable: false })
  to_url: string;

  @Index()
  @Column({ type: "tinyint", unsigned: true, nullable: true })
  pid: number;
}
