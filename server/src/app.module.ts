import { Module } from '@nestjs/common';
import { GoodsModule } from './web-modules/goods/goods.module';
import { UserModule } from './web-modules/user/user.module';
import { HomeModule } from './web-modules/home/home.module';
import { ShopcartModule } from './web-modules/shopcart/shopcart.module';
import { CategoryModule } from './web-modules/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GoodsModule,
    UserModule,
    HomeModule,
    ShopcartModule,
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '123456',
      host: 'localhost',
      port: 3306,
      database: 'gxbuy',
      synchronize: true,
      retryDelay: 500,
      retryAttempts: 10,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
