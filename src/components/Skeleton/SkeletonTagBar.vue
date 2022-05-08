<template>
  <el-skeleton
    class="skeletonContiner"
    :count="skeketonNum"
    :loading="loading"
    animated
  >
    <template #template>
      <el-skeleton-item class="tagBar" variant="h3" />
    </template>
  </el-skeleton>
</template>
<script setup>
defineProps({
  skeketonNum: {
    type: Number,
    default: 1,
  },
  loading: {
    type: Boolean,
    default: true,
  },
});
</script>
<style lang="scss" scoped>
.tagBar {
  width: 100%;
  height: 50px;
}
</style>
