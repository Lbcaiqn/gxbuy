import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { SearchGoodDto } from './dto/search-goods.dto';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller({
  path: 'goods',
  version: '1',
})
@ApiTags('商品相关接口')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post('/search')
  @ApiOperation({ summary: '搜索商品', description: '搜索商品' })
  @ApiResponse({ status: 403, description: '参数错误' })
  searchGoods(@Body() body: SearchGoodDto) {
    return this.goodsService.searchGoods(body);
  }

  @Get('detail/:id')
  getGoodsDetail() {
    return this.goodsService.getGoodsDetail();
  }
}
