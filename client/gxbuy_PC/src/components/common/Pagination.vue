<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  // 分别是总数，每页的数量，当前页码，显示几个页码按钮
  total: number;
  pageSize: number;
  pageNo: number;
  pagerCount: number;
}>();

const emits = defineEmits(['currentPage']);

let totalPage = computed(() => {
  return Math.ceil(props.total / props.pageSize);
});

const startAndEnd = computed(() => {
  let start = 0,
    end = 0;
  if (totalPage.value < props.pagerCount) {
    start = 1;
    end = totalPage.value;
  } else {
    start = props.pageNo - Math.floor(props.pagerCount / 2);
    end = props.pageNo + Math.floor(props.pagerCount / 2);
    if (start < 1) {
      start = 1;
      end = props.pagerCount;
    }
    if (end > totalPage.value) {
      end = totalPage.value;
      start = totalPage.value - props.pagerCount + 1;
    }
  }
  return { start, end };
});
</script>

<template>
  <div class="pagination">
    <button @click="emits('currentPage', pageNo - 1)" :disabled="pageNo <= 1">上一页</button>
    <button v-if="startAndEnd.start > 1" @click="emits('currentPage', 1)">1</button>
    <button v-if="startAndEnd.start > 2">.....</button>

    <button
      v-for="page in startAndEnd.end"
      :key="page"
      v-show="page >= startAndEnd.start"
      @click="emits('currentPage', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startAndEnd.end < totalPage - 1">......</button>
    <button v-if="startAndEnd.end < totalPage" @click="emits('currentPage', totalPage)">{{ totalPage }}</button>

    <button @click="emits('currentPage', pageNo + 1)" :disabled="pageNo == totalPage">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: rgb(255, 0, 54);
      color: #fff;
    }
  }
}
</style>
