import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Goods } from './entities/goods.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Goods])],
  controllers: [AaaController],
  providers: [AaaService],
})
export class AaaModule {}
