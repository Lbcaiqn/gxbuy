import { Injectable } from '@nestjs/common';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { Goods } from './entities/goods.entity';

@Injectable()
export class AaaService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    @InjectRepository(Goods) private readonly goodsRepository: Repository<Goods>
  ) {}

  create(createAaaDto: CreateAaaDto) {
    return 'This action adds a new aaa';
  }

  async findAll() {
    const u = await this.userRepository.find();
    const g = await this.goodsRepository.find();
    console.log(u);
    console.log(g);

    const uu = new Users();
    const gg = new Goods();

    uu.name = 'uuuuuuuuuuuuuuuuuuuuuuuuu';
    gg.name = 'gggggggggggggggggggggggggggggg';
    // uu.goods = [gg];
    gg.users = [uu];
    await this.userRepository.save(uu);
    await this.goodsRepository.save(gg);

    const u1 = await this.userRepository.find({ relations: ['goods'] });
    const g1 = await this.goodsRepository.find({ relations: ['users'] });

    console.log(u1);
    console.log(g1);

    return 123;
  }

  findOne(id: number) {
    return `This action returns a #${id} aaa`;
  }

  update(id: number, updateAaaDto: UpdateAaaDto) {
    return `This action updates a #${id} aaa`;
  }

  remove(id: number) {
    return `This action removes a #${id} aaa`;
  }
}
