import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { ShopManager } from './entities/shop_manager.entity';
import { ShopManagerRole } from './entities/shop_manager_role.entity';
import { ShopRegisterDto } from './dto/shop-register.dto';
import { User } from '../user/entities/user.entity';
import { UserFollow } from '../user/entities/user_follow.entity';
import { varify } from 'jsonwebtoken';
import { SECRCT } from '@/common/secrct';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
    @InjectRepository(ShopManager) private readonly shopManagerRepository: Repository<ShopManager>,
    @InjectRepository(ShopManagerRole) private readonly shopManagerRoleRepository: Repository<ShopManagerRole>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserFollow) private readonly userFollowRepository: Repository<UserFollow>
  ) {}

  async getShopInfo(req: Request, id: string) {
    const data = await this.shopRepository.findOne({
      relations: ['goods_spu'],
      where: { _id: id },
    });

    if (!data) return '商家不存在';

    const resData = { ...data, isFollow: false };

    //如果是目前是登录状态，就查看是否关注了商家
    let user_id: string | null = null;
    try {
      user_id = varify(req.headers.authorization, SECRCT).user_id;
    } catch (err) {
      user_id = null;
    }
    if (!user_id) {
      const user = await this.userRepository.findOne({ where: { _id: user_id } });
      if (!user) {
        const userFollow = await this.userFollowRepository
          .createQueryBuilder('user_follow')
          .where('user_id = :id', { id: user_id })
          .andWhere('shop_id = :id', { id: resData._id })
          .getOne();
        if (userFollow) resData.isFollow = true;
      }
    }

    return data;
  }

  async register(registerInfo: ShopRegisterDto) {
    const shop = new Shop();
    const shopManager = new ShopManager();
    const shopManagerRole = new ShopManagerRole();

    shop.shop_logo = '';
    shop.shop_name = registerInfo.shop_name;
    shop.shop_account = registerInfo.shop_account;
    await shop.hashPassword(registerInfo.shop_password);
    try {
      await this.shopRepository.save(shop);
    } catch (er) {
      return '用户名已存在';
    }

    // shopManager.shop_manager_name = registerInfo.shop_manager_name;
    // shopManager.shop_manager_account = registerInfo.shop_manager_account;
    // await shopManager.hashPassword(registerInfo.shop_manager_password);
    // shopManager.shop = shop;
    // await this.shopManagerRepository.save(shopManager);

    // shopManagerRole.shop_manager_role_name = 'admin';
    // shopManagerRole.shop = shop;
    // shopManagerRole.shop_manager.push(shopManager);
    // await this.shopManagerRoleRepository.save(shopManagerRole);

    return '注册成功';
  }
}
