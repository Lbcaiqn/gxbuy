import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomeService } from './home.service';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller({
  path: 'home',
  version: '1',
})
@ApiTags('公共数据相关接口')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('/getBannerData')
  @ApiOperation({ summary: '获取轮播图数据', description: '获取轮播图数据' })
  getBannerData() {
    return this.homeService.getBannerData();
  }

  @Get('/getRecommendData')
  @ApiOperation({ summary: '获取推荐信息数据', description: '获取推荐信息数据' })
  getRecommendData() {
    return this.homeService.getRecommendData();
  }
}
