import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserFavorite } from './entities/user_favorite.entity';
import { UserBrowseHistory } from './entities/user_browse_history.entity';
import { UserSearchHistory } from './entities/user_search_history.entity';
import { UserFollow } from './entities/user_follow.entity';
import { GoodsSpu } from '../goods/entities/goods_spu.entity';
import { Shop } from '../shop/entities/shop.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserFavorite, UserBrowseHistory, UserSearchHistory, UserFollow, GoodsSpu, Shop]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
