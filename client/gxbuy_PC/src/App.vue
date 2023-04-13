<script setup lang='ts'>
import 'normalize.css';
import Header from '@/components/content/Header/Header.vue';
import Footer from '@/components/content/Footer/Footer.vue';
import aaa from "./1.vue"

</script>

<template>
  <Header />
  <router-view></router-view>
  <Footer v-show="$route?.meta?.showFooter" />
  <aaa />
</template>

<style lang='less'></style>
