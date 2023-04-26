import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { Users } from './user.entity';
@Entity()
export class Goods {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @ManyToMany(() => Users, { createForeignKeyConstraints: false })
  @JoinTable({ name: 'users_and_goods' })
  users: Users[];
}
