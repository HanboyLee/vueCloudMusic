<template>
  <ElRow class="py-4" :style="{ width: maxWidth }">
    <ElCol :span="titleColSpan" class="text-lg text-red-400">
      {{ title }}:</ElCol
    >
    <ElCol
      class="tagCol"
      :key="data.id || data"
      :span="colSpan"
      v-for="data in datas"
    >
      <TagItem
        class="cursor-pointer"
        :data="data"
        :currentTagId="currentTagId"
        @onCheckChange="(item) => emit('onCheckChange', item)"
      />
    </ElCol>
  </ElRow>
</template>

<script setup>
import TagItem from "./TagItem.vue";
defineProps({
  datas: {
    type: Array,
  },
  currentTagId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  colSpan: {
    type: Number,
    default: 3,
  },
  titleColSpan: {
    type: Number,
    default: 2,
  },
  maxWidth: {
    type: String,
    default: "50%",
  },
});
const emit = defineEmits(["onCheckChange"]);
</script>
<style lang="scss" scoped>
.tagCol {
  text-align: center !important;
}
</style>
