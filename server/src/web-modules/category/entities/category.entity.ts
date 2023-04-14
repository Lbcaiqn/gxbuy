import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: 'smallint', unsigned: true })
  _id: number;

  @Column({ type: 'smallint', unsigned: true, nullable: false })
  cat_pid: number;

  @Column({ type: 'tinyint', unsigned: true, nullable: false })
  cat_level: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  cat_name: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  cat_icon: string;
}
