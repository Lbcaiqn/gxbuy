import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { GoodsSpu } from './entities/goods_spu.entity';

@Injectable()
export class GoodsService {
  constructor(@InjectRepository(GoodsSpu) private readonly GoodsSpuRepository: Repository<GoodsSpu>) {}

  async searchGoods(query: {
    keyword: string;
    c1id: number;
    c2id: number;
    c3id: number;
    pageSize: number;
    page: number;
  }) {
    let where: any = {};

    if (!query?.keyword) where.goods_spu_name = Like(`%${query.keyword}%`);
    if (!query?.c1id) where.c1id = query.c1id;
    if (!query?.c2id) where.c2id = query.c2id;
    if (!query?.c3id) where.c3id = query.c3id;

    const data = await this.GoodsSpuRepository.find({
      where,
      skip: query?.page - 1 || 0,
      take: query.pageSize,
    });

    return data;
  }

  async getGoodsDetail(id: string) {
    const data = await this.GoodsSpuRepository.findOne({
      where: { _id: id },
      relations: [
        'shop',
        'goods_sku',
        'goods_banner_img',
        'goods_detail_img',
        'goods_attribute',
        'goods_attribute.attribute',
      ],
    });
    return data;
  }
}
