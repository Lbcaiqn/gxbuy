<script setup lang="ts">
import PCHeader from './components/content/PCHeader.vue';
import PCFooter from './components/content/PCFooter.vue';
</script>

<template>
  <PCHeader />
  <router-view />
  <PCFooter />
</template>

<style lang="less"></style>
