import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { Goods } from './goods.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @ManyToMany(() => Goods, { createForeignKeyConstraints: false })
  @JoinTable({ name: 'users_and_goods' })
  goods: Goods[];
}
