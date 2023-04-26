import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HomeRecommend {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  _id: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  keyword: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  img: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  pid: string;
}
