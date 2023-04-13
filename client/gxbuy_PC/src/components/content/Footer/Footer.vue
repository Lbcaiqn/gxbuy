<script setup lang='ts'>
import { reactive } from 'vue';
import wx_cz from '../../../assets/images/wx_cz.jpg'

let footerMessage = reactive([
  {
    title: '购物指南',
    items: ['购物流程', '会员介绍', '生活旅行/团购', '常见问题', '购物zhinan ']
  },
  {
    title: '配送方式',
    items: ['上门自提', '限时送达', '配送服务查询', '配送费收取查询', '海外配送']
  },
  {
    title: '支付方式',
    items: ['在线支付', '货到付款', '分期付款', '邮局汇款', '公司转账']
  },
  {
    title: '售后服务',
    items: ['售后政策', '价格保护', '退款规则', '返修/退换货', '取消订单']
  },
  {
    title: '特色服务',
    items: ['延保服务', '聚夺宝', '一对一装机', '会员E卡', '聚享通信']
  },
  {
    title: '关注我们',
    image: wx_cz
  }
]);
let detailMessage = reactive(['关于我们', '联系我们', '商家入驻', '营销中心', '友情链接']);


</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footerList">
        <div class="footerItem" v-for="item in footerMessage">
          <h4>{{ item.title }}</h4>
          <ul v-if="item?.items" class="footerItemCon">
            <li v-for="i in item.items">{{ i }}</li>
          </ul>
          <img v-else :src="item?.image" />
        </div>
      </div>
      <div class="copyright">
        <ul class="helpLink">
          <li v-for="(item, itemIndex) in detailMessage">
            {{ item }}
            <span v-if="itemIndex < detailMessage.length - 1" class="space"></span>
          </li>

        </ul>

      </div>
    </div>
  </footer>
</template>

<style lang='less' scoped>
.footer {
  background-color: #eaeaea;

  .footer-container {
    width: 1200px;
    margin: 0 auto;
    padding: 0 15px;

    .footerList {
      padding: 20px;
      border-bottom: 1px solid #e4e1e1;
      border-top: 1px solid #e4e1e1;
      overflow: hidden;
      padding-left: 40px;

      .footerItem {
        width: 16.6666667%;
        float: left;

        h4 {
          font-size: 14px;
        }

        .footerItemCon {
          li {
            line-height: 18px;
          }
        }

        &:last-child img {
          width: 121px;
        }
      }
    }

    .copyright {
      padding: 20px;

      .helpLink {
        text-align: center;

        li {
          display: inline;

          .space {
            border-left: 1px solid #666;
            width: 1px;
            height: 13px;
            background: #666;
            margin: 8px 10px;
          }
        }
      }

      p {
        margin: 10px 0;
        text-align: center;
      }
    }
  }
}
</style>
