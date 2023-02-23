<script setup lang='ts'>
import { defineAsyncComponent } from 'vue';
const Category = defineAsyncComponent(() => import('@/components/common/Category/Category.vue'));
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
</template>

<style lang='less' scoped></style>
