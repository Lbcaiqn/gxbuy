import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  _id: bigint;

  @Column({ type: 'varchar', length: 10, unique: true, nullable: false })
  shop_name: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  shop_logo: string;
}
