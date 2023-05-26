<script setup lang="ts">
import PCHeader from './components/content/PCHeader.vue';
import PCFooter from './components/content/PCFooter.vue';
</script>

<template>
  <PCHeader />

  <router-view v-slot:default="{ Component }">
    <keep-alive :include="['home']">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>

  <PCFooter />
</template>

<style lang="less"></style>
