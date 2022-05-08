<template>
  <el-skeleton
    class="skeletonContiner"
    :count="skeketonNum"
    :loading="loading"
    animated
  >
    <template #template>
      <el-skeleton-item variant="image" :style="areaImg" class="skeletonImg" />
      <div class="skeletonDesc">
        <el-skeleton-item class="title" variant="h3" />
        <el-skeleton-item class="text" variant="text" />
      </div>
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
  areaImg: {
    type: Object,
    default() {
      return {
        width: "120px",
        height: "130px",
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.skeletonContiner {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 1rem;
  .skeletonImg {
    margin: 0 auto;
    border-radius: 5px;
  }
}
.skeletonDesc {
  text-align: center;
  .title {
    width: 90%;
    text-align: center;
    margin-top: 0.5rem;
  }
  .text {
    margin-top: 0.5rem;
    width: 70%;
  }
}
</style>
