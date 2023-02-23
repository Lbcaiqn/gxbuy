<script setup lang='ts'>
import 'normalize.css';
import Header from '@/components/content/Header/Header.vue';
import Footer from '@/components/content/Footer/Footer.vue';

</script>

<template>
  <Header />
  <router-view></router-view>
  <Footer v-show="$route?.meta?.showFooter" />
</template>

<style lang='less'>
* {
  margin: 0;
  padding: 0;
}
</style>
