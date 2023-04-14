import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Attribute } from './entities/attribute.entity';
import { toThree } from '@/tools/common';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly CategoryRepository: Repository<Category>,
    @InjectRepository(Attribute) private readonly AttributeRepository: Repository<Attribute>
  ) {}

  async getCategory() {
    const cat = await this.CategoryRepository.find();
    return toThree(cat, 0, 2);
    // return 123;
  }
}
