import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: string;

  @Column({ type: "varchar", length: 25, nullable: false })
  attr_name: string;

  @Column({ type: "varchar", length: 250, nullable: true })
  attr_values: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  add_time: Date;

  @Index()
  @Column({ type: "smallint", unsigned: true })
  cid: number;

  @Index()
  @Column({ type: "smallint", unsigned: true })
  c1id: number;

  @Index()
  @Column({ type: "smallint", unsigned: true })
  c2id: number;

  @Index()
  @Column({ type: "smallint", unsigned: true })
  c3id: number;
}
