import * as fs from "fs";
import { createConnection, getRepository } from "typeorm";
import { HomeBanner } from "./entity/home_banner.entity";
import { HomeRecommend } from "./entity/home_recommend.entity";
import { HomeFloor } from "./entity/home_floor.entity";
import { Shop } from "./entity/shop.entity";
import { ShopManager } from "./entity/shop_manager.entity";
import { ShopManagerRole } from "./entity/shop_manager_role.entity";
import { SmMtmSmr } from "./entity/sm_mtm_smr.entity";
import { User } from "./entity/user.entity";
import { UserFavorite } from "./entity/user_favorite.entity";
import { UserBrowseHistory } from "./entity/user_browse_history.entity";
import { UserSearchHistory } from "./entity/user_search_history.entity";
import { UserFollow } from "./entity/user_follow.entity";
import { GoodsSpu } from "./entity/goods_spu.entity";
import { GoodsSku } from "./entity/goods_sku.entity";
import { GoodsImg } from "./entity/goods_img.entity";
import { GoodsAttribute } from "./entity/goods_attribute.entity";
import { Attribute } from "./entity/attribute.entity";
import { Category } from "./entity/category.entity";
import { Shopcart } from "./entity/shopcart.entity";
import { OrderInformation } from "./entity/order_information.entity";
import { OrderItem } from "./entity/order_item.entity";

let tableCnt = 0;
let total = 32;

const entity = [
  { type: HomeBanner, url: "./data/home_banner.json" },
  { type: HomeRecommend, url: "./data/home_recommend.json" },
  { type: HomeFloor, url: "./data/home_floor.json" },

  { type: Shop, url: "./data/shop.json" },
  { type: ShopManager, url: "./data/shop_manager.json" },
  { type: ShopManagerRole, url: "./data/shop_manager_role.json" },
  { type: SmMtmSmr, url: "./data/sm_mtm_smr.json" },

  { type: User, url: "./data/user.json" },
  { type: UserFavorite, url: "./data/user_favorite.json" },
  { type: UserFollow, url: "./data/user_follow.json" },
  { type: UserBrowseHistory, url: "./data/user_browse_history.json" },
  { type: UserSearchHistory, url: "./data/user_search_history.json" },

  { type: GoodsSpu, url: "./data/goods_spu.json" },
  { type: GoodsSku, url: "./data/goods_sku.json" },
  { type: GoodsImg, url: "./data/goods_img.json" },
  { type: GoodsAttribute, url: "./data/goods_attribute.json" },

  { type: Attribute, url: "./data/attribute.json" },
  { type: Category, url: "./data/category.json" },

  { type: Shopcart, url: "./data/shopcart.json" },

  { type: OrderInformation, url: "./data/order_information/1.json" },
  { type: OrderInformation, url: "./data/order_information/2.json" },

  { type: OrderItem, url: "./data/order_item/1.json" },
  { type: OrderItem, url: "./data/order_item/2.json" },
  { type: OrderItem, url: "./data/order_item/3.json" },
  { type: OrderItem, url: "./data/order_item/4.json" },
  { type: OrderItem, url: "./data/order_item/5.json" },
  { type: OrderItem, url: "./data/order_item/6.json" },
  { type: OrderItem, url: "./data/order_item/7.json" },
  { type: OrderItem, url: "./data/order_item/8.json" },
  { type: OrderItem, url: "./data/order_item/9.json" },
  { type: OrderItem, url: "./data/order_item/10.json" },
  { type: OrderItem, url: "./data/order_item/11.json" },
];

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

  for (let e of entity) {
    const data = JSON.parse(fs.readFileSync(e.url).toString());
    let chunk: any[] = [];
    let cnt = 0;

    for (let i of data) {
      chunk.push(i);
      cnt++;
      if (cnt % 50000 == 0 || cnt >= data.length) {
        await getRepository(e.type).save(chunk);
        chunk = [];
      }
    }
    console.log(`进度：( ${++tableCnt} / ${total} )`);
  }

  console.log("数据库初始化完成");

  connection.close();
})();
