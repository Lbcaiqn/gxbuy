<script setup lang="ts">
import { reactive } from 'vue';
import { getFloorDataRequest } from '@/api';

const floorData = reactive<any>({
  floor: [],
});

async function getFloorData() {
  floorData.floor = (await getFloorDataRequest()).data;
}
getFloorData();
</script>

<template>
  <div id="pc-footer">
    <div class="pc-center">
      <div class="floor-item" v-for="i in floorData.floor" :key="i._id">
        <p>{{ i.name }}</p>
        <ul>
          <li v-for="j in i.children">{{ j.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';

#pc-footer {
  margin-top: 50px;
  border-top: 2px solid @main-color;
  .pc-center {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    p {
      margin: 8px 0;
      font-weight: bold;
      cursor: pointer;
    }

    li {
      padding: 2px 0;
      cursor: pointer;
    }
  }
}
</style>
