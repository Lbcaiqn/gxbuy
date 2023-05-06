import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class HomeRecommend {
  @PrimaryGeneratedColumn({ type: 'tinyint', unsigned: true })
  _id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  keyword: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  img: string;

  @Column({ type: 'tinyint', unsigned: true, nullable: true })
  pid: number;

  @ManyToOne(() => HomeRecommend, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'pid' })
  parent: HomeRecommend;

  @OneToMany(() => HomeRecommend, hr => hr.parent)
  children: HomeRecommend[];
}