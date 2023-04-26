const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");
const pw = "$2a$10$f0qTEykOESwXtP2PaSZTf.SAZ1.b.FT2eIxnHxwsyFNL54NsdDpkW";
const Jimp = require("jimp");

function format(dateTime = new Date()) {
  const year = dateTime.getFullYear();
  const month =
    dateTime.getMonth() + 1 > 9
      ? dateTime.getMonth() + 1
      : "0" + (dateTime.getMonth() + 1);
  const day =
    dateTime.getDate() > 9 ? dateTime.getDate() : "0" + dateTime.getDate();

  const hour =
    dateTime.getHours() > 9 ? dateTime.getHours() : "0" + dateTime.getHours();
  const minute =
    dateTime.getMinutes() > 9
      ? dateTime.getMinutes()
      : "0" + dateTime.getMinutes();
  const second =
    dateTime.getSeconds() > 9
      ? dateTime.getSeconds()
      : "0" + dateTime.getSeconds();

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

const baseURL = "https://api-hmugo-web.itheima.net";

const b = JSON.parse(fs.readFileSync("./data/home_banner.json"));
const r = JSON.parse(fs.readFileSync("./data/home_recommend.json"));

console.log(r);
// let o = [];
// let oo = [];
// let cnt = 1;
// let u = 0;
// for (let i of user) {
//   let r = Math.floor(Math.random() * 100 + 1);
//   for (let j = 0; j < r; j++) {
//     let gid = [];
//     let rr = Math.floor(Math.random() * 3 + 1);
//     for (let k = 0; k < rr; k++) {
//       let index = Math.floor(Math.random() * 47074);
//       if (gid.includes(index)) {
//         k--;
//         continue;
//       }
//       gid.push(index);
//     }
//     let t = gid.map((qqq) => sku[qqq]).map((qqq) => qqq.add_time);
//     t.push(i.add_time);
//     t = t.map((qqq) => new Date(qqq).getTime());
//     t = Math.max(...t);
//     t = format(
//       new Date(
//         Math.floor(
//           Math.random() * (new Date().getTime() - new Date(t).getTime()) +
//             new Date(t).getTime()
//         )
//       )
//     );
//     let t1 = format(new Date(new Date(t).getTime() + 259200000));
//     o.push({
//       _id: cnt,
//       order_state: "finish",
//       user_id: i._id,
//       add_time: t,
//       update_time: t1,
//     });
//     for (let ii of gid) {
//       let good = sku[ii];
//       let s = shop.find((sh) => sh._id == good.shop_id);
//       oo.push({
//         goods_spu_name: good.goods_sku_name,
//         goods_sku_img: good.goods_sku_img,
//         goods_sku_price: good.goods_sku_price,
//         sku_sales_attrs: good.sku_sales_attrs,
//         shop_name: s.shop_name,
//         shop_logo: s.shop_logo,
//         order_information_id: cnt,
//         user_id: i._id,
//         shop_id: s._id,
//         goods_spu_id: good._id,
//         goods_sku_id: good._id,
//         add_time: t,
//         update_time: t1,
//       });
//     }
//     gid = [];
//     cnt++;
//   }
//   console.log(++u);
// }

// let size = 500000;
// let num = Math.ceil(oo.length / size);

// for (let i = 1; i <= num; i++) {
//   fs.writeFileSync(
//     `./data/order_item/${i}.json`,
//     JSON.stringify(oo.splice(0, size))
//   );
//   console.log(num, "ok");
// }
