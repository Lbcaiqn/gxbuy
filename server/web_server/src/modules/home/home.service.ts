import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HomeBanner } from './entities/home_banner.entity';
import { HomeRecommend } from './entities/home_recommend.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(HomeBanner) private readonly homeBannerRepository: Repository<HomeBanner>,
    @InjectRepository(HomeRecommend) private readonly homeRecommendRepository: Repository<HomeRecommend>
  ) {}

  async getBannerData() {
    const data = await this.homeBannerRepository.find();
    return data;
  }

  async getRecommendData() {
    const data = await this.homeRecommendRepository.find();
    return data;
  }
}
