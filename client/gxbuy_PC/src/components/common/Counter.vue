<script setup lang="ts">
import { ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    count: number;
  }>(),
  {
    count: 1,
  }
);

const count = ref<number>(props.count);

function countInput(e: Event) {
  if ((e.target as HTMLInputElement).value === '') return;

  let value = Number((e.target as HTMLInputElement).value);
  if (!Number.isInteger(value) || value < 1) value = 1;
  count.value = value;
}

const emit = defineEmits(['countUpdate']);
watch(count, newVal => {
  if (!Number.isInteger(newVal)) return;
  emit('countUpdate', count.value);
});
</script>

<template>
  <div id="counter">
    <button class="counter-btn" @click="count = count > 1 ? count - 1 : count">-</button>
    <div>
      <input
        class="counter-inp"
        type="text"
        v-model="count"
        @input="countInput"
        @blur="count = !count || count > 999999999 ? 1 : count"
      />
    </div>
    <button class="counter-btn" @click="count = count < 999999999 ? count + 1 : count">+</button>
  </div>
</template>

<style lang="less" scoped>
#counter {
  display: flex;
  align-items: center;
  text-align: center;
  .counter-inp {
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .counter-btn {
    width: 40px;
    height: 40px;
    line-height: 30px;
    font-size: 25px;
    cursor: pointer;
  }
}
</style>
