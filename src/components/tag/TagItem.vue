<template>
  <ElTag @click="click" :checked="isCheck" :class="{ isCheck }">
    {{ data.title ?? data.name ?? data }}
  </ElTag>
</template>
<script setup>
import { computed } from "@vue/runtime-core";
import { ElTag } from "element-plus";
// const props = defineProps(["data", "currentTagId"]);
const props = defineProps({
  data: {
    type: [Object, String],
  },
  currentTagId: {
    type: [Number, String],
  },
});

const emit = defineEmits(["onCheckChange"]);

const isCheck = computed(
  () => props.data.id == props.currentTagId || props.data == props.currentTagId
);

function click() {
  emit("onCheckChange", props.data.id || props.data);
}
</script>
<style lang="scss">
.el-tag {
  margin: 0 0.3rem !important;
  border: none;
  color: #222;
  font-size: 0.8rem;
  padding: 0.5rem;
  cursor: pointer;
}
.isCheck {
  background: #222 !important;
  color: #fff !important;
}
</style>
