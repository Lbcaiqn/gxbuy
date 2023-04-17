import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsSpu } from './entities/goods_spu.entity';
import { GoodsSku } from './entities/goods_sku.entity';
import { GoodsBannerImg } from './entities/goods_banner_img.entity';
import { GoodsDetailImg } from './entities/goods_detail_img.entity';
import { GoodsAttribute } from './entities/goods_attribute.entity';
import { Shop } from './entities/shop.entity';
import { Attribute } from './entities/attribute.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GoodsSpu, GoodsSku, GoodsBannerImg, GoodsDetailImg, GoodsAttribute, Shop, Attribute]),
  ],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
