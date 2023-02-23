<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getBaseCategoryList } from '@/api/index';
import { throttle } from '@/tools/lodash'

const route = useRoute();

let baseCategoryList: any = (await getBaseCategoryList()).data.data;
console.log(baseCategoryList);

let show = ref<boolean>(true);
let currentIndex = ref<number>(-1);

const enterHandler = throttle((index: number) => {
  currentIndex.value = index;
}, 50);
function leaveHandler() {
  currentIndex.value = -1;
  if (route.path != '/Home') show.value = false;
}

function goSearch(e: any) {
  console.log(e.target)
}
function changeShow() {
  if (route.path != '/Home') show.value = true;
}
</script>

<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveHandler" @click="goSearch">
        <h2 class="all" @mouseenter="changeShow">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2">
              <div class="item" v-for="(c1, index) in baseCategoryList" :key="c1.categoryId">
                <h3 @mouseenter="enterHandler(index)" :class="{ active: currentIndex === index }">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                  <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName
                        }}</a>
                      </dt>
                      <dd>
                        <!--三级分类-->
                        <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName
                          }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<style lang='less' scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      border: 10px solid #000;
      position: absolute;
      left: 0;
      top: 25px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }

            &.active {
              background: yellowgreen;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /*温馨提示:豪哥不想利用样式控制二级、三级分类显示与隐藏,下面的代码进行注释*/
          /* &:hover {
            .item-list {
              display: block;
            }
          }
          */
        }
      }
    }

    /*过渡动画:商品分类 进入阶段*/
    .sort-enter-from {
      // height: 0px;
      opacity: 0;
    }

    .sort-enter-active {
      transition: all 2s;
    }

    .sort-enter-to {
      opacity: 1;
      // height: 461px;

    }
  }
}
</style>
