import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Shopcart } from './entities/shopcart.entity';
import { User } from '../user/entities/user.entity';
import { GoodsSpu } from '../goods/entities/goods_spu.entity';
import { GoodsSku } from '../goods/entities/goods_sku.entity';
import { Shop } from '../shop/entities/shop.entity';
import { ShopcartInsertDto } from './dto/shopcart-insert.dto';
import { ShopcartUpdateAllSelectedDto } from './dto/shopcart-update-all-selected.dto';
import { ShopcartUpdateSingleStateDto } from './dto/shopcart-update-single-state.dto';
import { ShopcartUpdateGoodsSkuDto } from './dto/shopcart-update-goods-sku.dto';
import { varify } from 'jsonwebtoken';
import { SECRCT } from '@/common/secrct';

@Injectable()
export class ShopcartService {
  constructor(
    @InjectRepository(Shopcart) private readonly shopcartRepository: Repository<Shopcart>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(GoodsSpu) private readonly goodsSpuRepository: Repository<GoodsSpu>,
    @InjectRepository(GoodsSku) private readonly goodsSkuRepository: Repository<GoodsSku>,
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>
  ) {}

  private readonly maxQuantity: number = 1000000000;

  async insertShopcartData(req: Request, insertInfo: ShopcartInsertDto) {
    const { user_id } = varify(req.headers.authorization, SECRCT);

    const user = await this.userRepository.findOne({
      where: { _id: user_id },
    });
    const goodsSpu = await this.goodsSpuRepository.findOne({
      where: { _id: insertInfo.goods_spu_id },
    });
    const goodsSku = await this.goodsSkuRepository.findOne({
      where: { _id: insertInfo.goods_sku_id },
    });
    const shop = await this.shopRepository.findOne({
      where: { _id: insertInfo.shop_id },
    });

    if (!user || !goodsSpu || !goodsSku || !shop) return '参数错误，插入失败';

    const isHave = await this.shopcartRepository
      .createQueryBuilder('showcart')
      .where('user_id = :userid AND goods_sku_id = :skuid', {
        userid: user_id,
        skuid: insertInfo.goods_sku_id,
      })
      .getOne();

    if (isHave) {
      isHave.quantity =
        isHave.quantity + insertInfo.quantity >= this.maxQuantity
          ? this.maxQuantity
          : isHave.quantity + insertInfo.quantity;
      await this.shopcartRepository.update(isHave._id, isHave);
      return '已有记录，数量+1';
    }

    const shopcart = new Shopcart();
    shopcart.selected = false;
    shopcart.quantity = insertInfo.quantity >= this.maxQuantity ? this.maxQuantity : insertInfo.quantity;
    shopcart.user = user;
    shopcart.goods_spu = goodsSpu;
    shopcart.goods_sku = goodsSku;
    shopcart.shop = shop;
    await this.shopcartRepository.save(shopcart);

    return '插入成功';
  }

  async getShopcartData(req: Request) {
    const { user_id } = varify(req.headers.authorization, SECRCT);
    const { pageSize, page } = req.query as any;

    const data = await this.shopcartRepository.find({
      where: { _id: user_id },
      skip: (page - 1) * pageSize || 0,
      take: pageSize || 30,
    });

    return data;
  }

  async updateGoodsSku(req: Request, updateInfo: ShopcartUpdateGoodsSkuDto) {
    const { user_id } = varify(req.headers.authorization, SECRCT);

    const data = await this.shopcartRepository
      .createQueryBuilder('shopcart')
      .where('user_id = :id', { id: user_id })
      .andWhere('goods_sku_id = :goodsSkuId', { goodsSkuId: updateInfo.goods_sku_id })
      .getOne();

    if (!data) return '参数错误';

    const newSku = await this.goodsSkuRepository
      .createQueryBuilder('goods_sku')
      .where('_id = :newGoodsSkuId', { newGoodsSkuId: updateInfo.new_goods_sku_id })
      .getOne();

    if (!newSku || newSku.goods_spu._id != data.goods_spu._id) return '参数错误';

    data.goods_sku = newSku;
    await this.shopcartRepository.update(data._id, data);

    return '修改成功';
  }

  async updateAllSelected(req: Request, updateInfo: ShopcartUpdateAllSelectedDto) {
    const { user_id } = varify(req.headers.authorization, SECRCT);

    const queryBuilder = this.shopcartRepository
      .createQueryBuilder('shopcart')
      .where('user_id = :id ', { id: user_id });

    const data: Shopcart[] = /shop/.test(updateInfo.command)
      ? await queryBuilder.andWhere('shop_id = :shopId', { shopId: updateInfo.shop_id }).getMany()
      : await queryBuilder.getMany();

    if (data.length === 0) return '参数错误';

    for (let i of data) {
      i.selected = !i.selected;
      await this.shopcartRepository.update(i._id, i);
    }

    return '修改成功';
  }

  async updateSingleState(req: Request, updateInfo: ShopcartUpdateSingleStateDto) {
    const { user_id } = varify(req.headers.authorization, SECRCT);

    const data = await this.shopcartRepository
      .createQueryBuilder('shopcart')
      .where('user_id = :id ', { id: user_id })
      .andWhere('goods_sku_id = :goodsSkuId ', { goodsSkuId: updateInfo.goods_sku_id })
      .getOne();

    if (!data) return '参数错误';

    switch (updateInfo.command) {
      case 'add':
        data.quantity = data.quantity >= this.maxQuantity ? data.quantity : data.quantity++;
        break;
      case 'reduce':
        data.quantity = data.quantity <= 1 ? 1 : data.quantity--;
        break;
      case 'selected':
        data.selected = !data.selected;
        break;
      default:
        break;
    }

    await this.shopcartRepository.update(data._id, data);

    return '修改成功';
  }

  async deleteSingle(req: Request) {
    const { goods_sku_id } = req.query as any;
    const { user_id } = varify(req.headers.authorization, SECRCT);

    const data = await this.shopcartRepository
      .createQueryBuilder('shopcart')
      .where('user_id = :id', { id: user_id })
      .andWhere('goods_sku_id = :id', { id: goods_sku_id })
      .getOne();

    if (!data) return '参数错误';

    await this.shopcartRepository.delete(data._id);

    return '删除成功';
  }

  async deleteAll(req: Request) {
    const { user_id } = varify(req.headers.authorization, SECRCT);

    const data = await this.shopcartRepository
      .createQueryBuilder('shopcart')
      .where('user_id = :id', { id: user_id })
      .getMany();

    if (data.length === 0) return '参数错误';

    for (let i of data) this.shopcartRepository.delete(i._id);
    return '清空成功';
  }
}
