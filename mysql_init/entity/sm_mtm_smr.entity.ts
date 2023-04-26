import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class SmMtmSmr {
  @PrimaryColumn({ type: "bigint", unsigned: true })
  shopManager_id: string;

  @PrimaryColumn({ type: "bigint", unsigned: true })
  shopManagerRole_id: string;
}
