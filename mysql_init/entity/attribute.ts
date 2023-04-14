import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: bigint;

  @Column({ type: "varchar", length: 25, nullable: false })
  attr_name: string;

  @Column({ type: "varchar", length: 250, nullable: true })
  attr_values: string;

  @Column({ type: "smallint", unsigned: true, nullable: false })
  cid: number;

  @Column({ type: "smallint", unsigned: true, nullable: false })
  c1id: number;

  @Column({ type: "smallint", unsigned: true, nullable: false })
  c2id: number;

  @Column({ type: "smallint", unsigned: true, nullable: false })
  c3id: number;
}
