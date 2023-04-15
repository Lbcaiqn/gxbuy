import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller({
  path: 'category',
  version: '1',
})
@ApiTags('分类相关接口')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('getCategoryList')
  @ApiOperation({ summary: '获取分类列表', description: '三级分类信息' })
  getCategoryList() {
    return this.categoryService.getCategoryList();
  }
}
