<template lang="">
  <el-carousel
    class="carousel"
    :interval="4000"
    type="card"
    indicator-position="none"
  >
    <el-carousel-item v-for="item in banners" :key="item">
      <div class="bannerWrap">
        <h4 :style="{ color: item.titleColor }">{{ item.typeTitle }}</h4>
        <ElImage class="img" :src="item.imageUrl" fit="fill" />
      </div>
    </el-carousel-item>
  </el-carousel>
</template>
<script setup>
defineProps(["banners"]);
</script>
<style lang="scss">
.bannerWrap {
  position: relative;
  height: 250px;
  min-height: 150px;
  border-radius: 10px;
  overflow: hidden;
  h4 {
    position: absolute;
    right: 1%;
    bottom: 5%;
    z-index: 100;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    padding: 0.5rem;
    font-weight: 800;
    letter-spacing: 1px;
  }
  .img {
    width: 100%;
    height: 100%;
  }
}
</style>
