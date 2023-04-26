import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

  async getCategoryList() {
    const data = await this.categoryRepository.find({
      where: { cat_level: 2 },
      relations: ['parent', 'parent.parent'],
    });

    const res = this.toTree(this.parentToChlidrenAll(data), 3);

    console.log(res[0]);

    return res;
  }

  private parentToChildrenSingle(category: Category, children: any = null): any {
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

  private parentToChlidrenAll(category: Category[]) {
    const res: any = [];
    for (let i of category) res.push(this.parentToChildrenSingle(i));
    return res;
  }

  private toTree(data: any, deep: number): any {
    if (deep <= 1) return data;
    const ids: any = {};
    const res: any = [];
    for (let i of data) {
      if (!ids[i._id]) {
        ids[i._id] = i;
        i.children = [i.children];
      } else ids[i._id].children = [...ids[i._id].children, i.children];
    }
    for (let i in ids) {
      res.push(ids[i]);
      ids[i].children = this.toTree(ids[i].children, --deep);
    }

    return res;
  }
}
