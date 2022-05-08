<template>
  <div @click="onSelect" class="flex gap-2 p-1 cursor-pointer">
    <ElAvatar :src="list.coverImgUrl" shape="square" :size="50" />
    <div class="text-sm">
      <div class="font-extrabold">{{ list.name }}</div>
      <div class="text-gray-400 py-2">{{ list.updateFrequency }}</div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  list: {
    type: Object,
  },
});
const emit = defineEmits(["update:selectedCurId"]);
const onSelect = () => {
  emit("update:selectedCurId", props.list.id);
};
</script>
<style lang="scss"></style>
