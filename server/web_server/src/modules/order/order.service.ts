import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderInformation } from './entities/order_information.entity';
import { varify } from 'jsonwebtoken';
import { SECRCT } from '@/common/secrct';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderInformation) private readonly orderInformationRepository: Repository<OrderInformation>
  ) {}

  async getOrderData(req: Request) {
    // const { user_id } = varify(req.headers.authorization, SECRCT);
    const user_id = 1;
    const data = await this.orderInformationRepository
      .createQueryBuilder('order_information')
      .innerJoinAndSelect('order_information.order_item', 'order_item')
      .where('order_information.user_id = :id', { id: user_id })
      .getMany();

    console.log(data);
    return data;
  }
}
