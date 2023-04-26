import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserFavorite } from './entities/user_favorite.entity';
import { UserFollow } from './entities/user_follow.entity';
import { UserBrowseHistory } from './entities/user_browse_history.entity';
import { UserSearchHistory } from './entities/user_search_history.entity';
import { GoodsSpu } from '../goods/entities/goods_spu.entity';
import { Shop } from '../shop/entities/shop.entity';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { sign, varify } from 'jsonwebtoken';
import { SECRCT } from '@/common/secrct';
import * as svgCaptcha from 'svg-captcha';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserFavorite) private readonly userFavoriteRepository: Repository<UserFavorite>,
    @InjectRepository(UserFollow) private readonly userFollowRepository: Repository<UserFollow>,
    @InjectRepository(UserBrowseHistory) private readonly userBrowseHistoryRepository: Repository<UserBrowseHistory>,
    @InjectRepository(UserSearchHistory) private readonly userSearchHistoryRepository: Repository<UserSearchHistory>,
    @InjectRepository(GoodsSpu) private readonly goodsSpuRepository: Repository<GoodsSpu>,
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>
  ) {}

  async register(registerInfo: UserRegisterDto) {
    const user = new User();

    user.user_name = registerInfo.user_name;
    user.user_icon = '';
    user.user_account = registerInfo.user_account;
    await user.hashPassword(registerInfo.user_password);

    try {
      await this.userRepository.save(user);
    } catch (er) {
      return '用户名已存在';
    }

    return '注册成功';
  }

  async login(code: string, loginInfo: UserLoginDto) {
    if (code !== loginInfo.code) return '验证码错误';

    const user = await this.userRepository.findOne({
      where: { user_account: loginInfo.user_account },
    });
    if (!user) return '用户名不存在';

    const valid = await user.comparePassword(loginInfo.user_password);
    if (!valid) return '密码错误';

    const token = sign(
      {
        _id: user._id,
      },
      SECRCT
    );

    return {
      message: '登录成功',
      token,
      user,
    };
  }

  async createCode(req: any, res: Response) {
    const code = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });

    req.session.code = code.text;

    res.type('image/svg+xml');
    res.send(code.data);
  }

  async getUserInfo(req: Request) {
    const { user_id } = varify(req.headers.authrization, SECRCT);

    const user = await this.userRepository.findOne({
      where: { _id: user_id },
    });

    if (!user) return '用户不存在';

    return user;
  }

  async getUserRecord(req: Request) {
    const { feature, pageSize, page } = req.query as any;
    const { user_id } = varify(req.headers.authorization, SECRCT);

    if (!['favorite', 'follow', 'browse-history', 'search-history'].includes(feature)) return '参数错误';

    const repository = {
      favorite: this.userFavoriteRepository
        .createQueryBuilder('user_favorite')
        .innerJoinAndSelect('user_favorite.goods_spu', 'goods_spu'),
      follow: this.userFollowRepository
        .createQueryBuilder('user_follow')
        .innerJoinAndSelect('user_follow.shop', 'shop'),
      'browse-history': this.userBrowseHistoryRepository
        .createQueryBuilder('user_browse_history')
        .innerJoinAndSelect('user_browse_history.goods_spu', 'goods_spu'),
      'search-history': this.userSearchHistoryRepository.createQueryBuilder('user_search_history'),
    };

    const data = await repository[feature]
      .where('user_id = :id', { id: user_id })
      .offset((page - 1) * pageSize || 0)
      .limit(pageSize || 30)
      .getMany();

    return data;
  }

  async favorite(req: Request) {
    const { user_id } = varify(req.headers.authorization, SECRCT);
    const { goods_spu_id } = req.query.good_spu_id as any;

    const data = await this.userFavoriteRepository
      .createQueryBuilder('user_favorite')
      .where('user_id = :id', { id: user_id })
      .andWhere('goods_spu_id = :id', { id: goods_spu_id })
      .getOne();

    if (!data) {
      const user = await this.userRepository.findOne({ where: { _id: user_id } });
      const spu = await this.goodsSpuRepository.findOne({ where: { _id: goods_spu_id } });
      if (!user && !spu) return '参数错误';

      const userFavorite = new UserFavorite();
      userFavorite.user = user;
      userFavorite.goods_spu = spu;
      await this.userFavoriteRepository.save(userFavorite);
    } else await this.userFavoriteRepository.delete(data._id);

    return '操作成功';
  }

  async follow(req: Request) {
    const { user_id } = varify(req.headers.authorization, SECRCT);
    const { shop_id } = req.query.shop_id as any;

    const data = await this.userFollowRepository
      .createQueryBuilder('user_follow')
      .where('user_id = :id', { id: user_id })
      .andWhere('shop_id = :id', { id: shop_id })
      .getOne();

    if (!data) {
      const user = await this.userRepository.findOne({ where: { _id: user_id } });
      const shop = await this.shopRepository.findOne({ where: { _id: shop_id } });
      if (!user && !shop) return '参数错误';

      const userFollow = new UserFollow();
      userFollow.user = user;
      userFollow.shop = shop;
      await this.userFollowRepository.save(userFollow);
    } else await this.userFollowRepository.delete(data._id);

    return '操作成功';
  }
}
