import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Shopcart } from '@/modules/shopcart/entities/shopcart.entity';
import { UserFavorite } from './user_favorite.entity';
import { UserSearchHistory } from './user_search_history.entity';
import { UserBrowseHistory } from './user_browse_history.entity';
import { UserFollow } from './user_follow.entity';
import { OrderInformation } from '@/modules/order/entities/order_information.entity';
import { OrderItem } from '@/modules/order/entities/order_item.entity';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  async hashPassword(password: string) {
    this.user_password = await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.user_password);
  }

  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  _id: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  user_account: string;

  @Column({ type: 'varchar', length: 100, nullable: false, select: false })
  user_password: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  user_name: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  user_icon: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  add_time: Date;

  @OneToMany(() => UserFavorite, uf => uf.user)
  user_favorite: UserFavorite[];

  @OneToMany(() => UserSearchHistory, ush => ush.user)
  user_search_history: UserSearchHistory[];

  @OneToMany(() => UserBrowseHistory, ubh => ubh.user)
  user_browse_history: UserBrowseHistory[];

  @OneToMany(() => UserFollow, uf => uf.user)
  user_follow: UserFavorite[];

  @OneToMany(() => Shopcart, sc => sc.user)
  shopcart: Shopcart[];

  @OneToMany(() => OrderInformation, oinfo => oinfo.user)
  order_information: OrderInformation[];

  @OneToMany(() => OrderItem, oitem => oitem.user)
  order_item: OrderItem[];
}
