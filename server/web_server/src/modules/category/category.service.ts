import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly CategoryRepository: Repository<Category>) {}

  async getCategoryList() {
    const data = await this.CategoryRepository.find({
      where: { cat_level: 2 },
      relations: ['parent', 'parent.parent'],
    });

    return this.parentToChlidrenAll(data);
  }

  private parentToChlidrenAll(category: Category[]) {
    const res: any = [];
    for (let i of category) res.push(this.parentToChildrenSingle(i));
    return res;
  }

  private parentToChildrenSingle(category: Category, children: any = []): any {
    let res: any = {
      _id: category._id,
      cat_name: category.cat_name,
      cat_level: category.cat_level,
      cat_icon: category.cat_icon,
      children,
    };

    if (category.parent) res = this.parentToChildrenSingle(category.parent, res);

    return res;
  }
}
