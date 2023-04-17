import * as fs from "fs";
import { createConnection, getRepository } from "typeorm";
import { Shop } from "./entity/shop.entity";
import { GoodsSpu } from "./entity/goods_spu.entity";
import { GoodsSku } from "./entity/goods_sku.entity";
import { GoodsBannerImg } from "./entity/goods_banner_img.entity";
import { GoodsDetailImg } from "./entity/goods_detail_img.entity";
import { GoodsAttribute } from "./entity/goods_attribute.entity";
import { Attribute } from "./entity/attribute.entity";
import { Category } from "./entity/category.entity";

const url = {
  shop: "./data/shop.json",
  goods_spu: "./data/goods_spu.json",
  goods_sku: "./data/goods_sku.json",
  goods_banner_img: "./data/goods_banner_img.json",
  goods_detail_img: "./data/goods_detail_img.json",
  goods_attribute: "./data/goods_attribute.json",
  attribute: "./data/attribute.json",
  category: "./data/category.json",
};

let tableCnt = 0;
let total = 8;

(async () => {
  const connection = await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "gxbuy",
    entities: ["./entity/**/*.ts"],
    synchronize: true,
  });

  console.log(`进度：( ${tableCnt} / ${total} )`);

  const shopJson = fs.readFileSync(url.shop);
  const shopData = JSON.parse(shopJson.toString());
  await getRepository(Shop).insert(shopData);
  console.log(`进度：( ${++tableCnt} / ${total} )`);

  const goodsSpuJson = fs.readFileSync(url.goods_spu);
  const goodsSpuData = JSON.parse(goodsSpuJson.toString());
  await getRepository(GoodsSpu).insert(goodsSpuData);
  console.log(`进度：( ${++tableCnt} / ${total} )`);

  const goodsSkuJson = fs.readFileSync(url.goods_sku);
  const goodsSkuData = JSON.parse(goodsSkuJson.toString());
  await getRepository(GoodsSku).insert(goodsSkuData);
  console.log(`进度：( ${++tableCnt} / ${total} )`);

  const goodsBannerImgJson = fs.readFileSync(url.goods_banner_img);
  const goodsBannerImgData = JSON.parse(goodsBannerImgJson.toString());
  await getRepository(GoodsBannerImg).insert(goodsBannerImgData);
  console.log(`进度：( ${++tableCnt} / ${total} )`);

  const goodsDetailImgJson = fs.readFileSync(url.goods_detail_img);
  const goodsDetailImgData = JSON.parse(goodsDetailImgJson.toString());
  let chunk: GoodsDetailImg[] = [];
  let cnt = 0;
  for (let i of goodsDetailImgData) {
    chunk.push(i);
    cnt++;
    if (cnt % 200000 == 0 || cnt >= goodsDetailImgData.length) {
      await getRepository(GoodsDetailImg).insert(chunk);
      chunk = [];
    }
  }
  console.log(`进度：( ${++tableCnt} / ${total} )`);

  const goodsAttributeJson = fs.readFileSync(url.goods_attribute);
  const goodsAttributeData = JSON.parse(goodsAttributeJson.toString());
  await getRepository(GoodsAttribute).insert(goodsAttributeData);
  console.log(`进度：( ${++tableCnt} / ${total} )`);

  const attributeJson = fs.readFileSync(url.attribute);
  const attributeData = JSON.parse(attributeJson.toString());
  await getRepository(Attribute).insert(attributeData);
  console.log(`进度：( ${++tableCnt} / ${total} )`);

  const categoryJson = fs.readFileSync(url.category);
  const categoryData = JSON.parse(categoryJson.toString());
  await getRepository(Category).insert(categoryData);
  console.log(`进度：( ${++tableCnt} / ${total} )`);

  console.log("数据库初始化完成");

  connection.close();
})();
