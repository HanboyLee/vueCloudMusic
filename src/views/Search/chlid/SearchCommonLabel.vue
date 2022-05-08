<template>
  <div class="py-2 text-gray-500 text-sm">
    搜索“{{ $store.state.search.queryInfo.keywords }}”，找到
    <span class="text-red-600"> {{ count }}</span>
    <span>{{ suffixText }}</span>
  </div>
</template>
<script setup>
defineProps({
  count: {
    type: Number,
  },
  suffixText: {
    type: String,
  },
});
</script>
<style lang="scss"></style>
