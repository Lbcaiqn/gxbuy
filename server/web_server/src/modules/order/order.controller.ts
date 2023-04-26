import { Controller, Get, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller({
  path: 'order',
  version: '1',
})
@ApiTags('订单相关接口')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/getOrderData')
  @Get('/jwt/getUserInfo')
  // @SetMetadata('jwt', true)
  @ApiOperation({ summary: '获取用户订单信息', description: '获取用户订单信息' })
  @ApiBearerAuth()
  getOrderData(@Req() req) {
    return this.orderService.getOrderData(req);
  }
}
