import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderInformation } from './entities/order_information.entity';
import { OrderItem } from './entities/order_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderInformation, OrderItem])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
