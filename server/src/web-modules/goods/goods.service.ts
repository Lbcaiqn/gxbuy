import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodsSpu } from './entities/goods_spu.entity';
import { GoodsSku } from './entities/goods_sku.entity';
import { GoodsBannerImg } from './entities/goods_banner_img.entity';
import { GoodsDetailImg } from './entities/goods_detail_img.entity';
import { GoodsAttribute } from './entities/goods_attribute.entity';
import { SearchGoodDto } from './dto/search-goods.dto';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsSpu) private readonly GoodsSpuRepository: Repository<GoodsSpu>,
    @InjectRepository(GoodsSku) private readonly GoodsSkuRepository: Repository<GoodsSku>,
    @InjectRepository(GoodsBannerImg) private readonly GoodsBannerImgRepository: Repository<GoodsBannerImg>,
    @InjectRepository(GoodsDetailImg) private readonly GoodsDetailImgRepository: Repository<GoodsDetailImg>,
    @InjectRepository(GoodsAttribute) private readonly GoodsAttributeRepository: Repository<GoodsAttribute>
  ) {}

  async searchGoods(body: SearchGoodDto) {
    let where = '1 = 1';
    const whereParams: any = {};

    if (!body?.keyword) {
      where += 'AND goods_spu.goods_spu_name LIKE :keyword';
      whereParams.keyword = `%${body.keyword}%`;
    }
    if (!body?.c1id) {
      where += 'goods_spu.c1id = :c1id';
      whereParams.c1id = body.c1id;
    }
    if (!body?.c2id) {
      where += 'goods_spu.c2id = :c2id';
      whereParams.c2id = body.c2id;
    }
    if (!body?.c3id) {
      where += 'goods_spu.c3id = :c3id';
      whereParams.c3id = body.c3id;
    }

    const data = await this.GoodsSpuRepository.createQueryBuilder('goods_spu')
      .select([
        'goods_spu._id',
        'goods_spu.goods_spu_name',
        'goods_spu.goods_spu_main_img',
        'goods_spu.goods_first_sku_price',
      ])
      .where(where, whereParams)
      .orderBy('goods_spu.add_time', 'DESC')
      .limit(body?.pageSize || 30)
      .offset(body?.pageSize * (body?.page - 1) || 0)
      .getMany();

    return data;
  }

  getGoodsDetail() {
    // const data = await this.GoodsSpuRepository.createQueryBuilder('goods_spu')
    //   .select()

    //   .where(where, whereParams)
    //   .orderBy('goods_spu.add_time', 'DESC')
    //   .limit(body?.pageSize || 30)
    //   .offset(body?.pageSize * (body?.page - 1) || 0)
    //   .getMany();

    return 123;
  }
}
