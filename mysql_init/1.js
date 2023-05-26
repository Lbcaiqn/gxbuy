const fs = require("fs");
// const cheerio = require("cheerio");
// const axios = require("axios");
const pw = "$2a$10$f0qTEykOESwXtP2PaSZTf.SAZ1.b.FT2eIxnHxwsyFNL54NsdDpkW";
// const Jimp = require("jimp");

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
const u = JSON.parse(fs.readFileSync("./data/user.json"));
console.log(u[0]);
