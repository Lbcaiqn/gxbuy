<script setup lang='ts'>
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue';
const Category = defineAsyncComponent(() => import('@/components/common/Category/Category.vue'));

let show = ref(true);
</script>

<template>
  <Suspense>
    <template v-slot:default>
      <Category />
    </template>
    <template v-slot:fallback>
      <h3>loading...</h3>
    </template>
  </Suspense>
</template >

<style lang= 'less' scoped ></style>
