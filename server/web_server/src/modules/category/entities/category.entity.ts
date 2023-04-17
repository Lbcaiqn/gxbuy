import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { GoodsSpu } from '@/modules/goods/entities/goods_spu.entity';
import { GoodsSku } from '@/modules/goods/entities/goods_sku.entity';
import { Attribute } from '@/modules/goods/entities/attribute.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: 'smallint', unsigned: true })
  _id: number;

  @Column({ type: 'tinyint', unsigned: true, nullable: false })
  cat_level: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  cat_name: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  cat_icon: string;

  @OneToOne(() => Category, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'cat_pid' })
  parent: Category;

  @OneToMany(() => GoodsSpu, gspu => gspu.cid_msg)
  goods_spu_is_cid: GoodsSpu[];

  @OneToMany(() => GoodsSpu, gspu => gspu.c1id_msg)
  goods_spu_is_c1id: GoodsSpu[];

  @OneToMany(() => GoodsSpu, gspu => gspu.c2id_msg)
  goods_spu_is_c2id: GoodsSpu[];

  @OneToMany(() => GoodsSpu, gspu => gspu.c3id_msg)
  goods_spu_is_c3id: GoodsSpu[];

  @OneToMany(() => GoodsSku, gsku => gsku.cid_msg)
  goods_sku_is_cid: GoodsSku[];

  @OneToMany(() => GoodsSku, gsku => gsku.c1id_msg)
  goods_sku_is_c1id: GoodsSku[];

  @OneToMany(() => GoodsSku, gsku => gsku.c2id_msg)
  goods_sku_is_c2id: GoodsSku[];

  @OneToMany(() => GoodsSku, gsku => gsku.c3id_msg)
  goods_sku_is_c3id: GoodsSku[];

  @OneToMany(() => Attribute, attr => attr.cid_msg)
  attr_is_cid: Attribute[];

  @OneToMany(() => Attribute, attr => attr.c1id_msg)
  attr_is_c1id: Attribute[];

  @OneToMany(() => Attribute, attr => attr.c2id_msg)
  attr_is_c2id: Attribute[];

  @OneToMany(() => Attribute, attr => attr.c3id_msg)
  attr_is_c3id: Attribute[];
}
