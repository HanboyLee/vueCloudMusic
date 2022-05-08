<template>
  <div class="CommonContainer">
    <ElImage
      v-if="datas.picUrl"
      class="img"
      :src="datas.picUrl + '?param=250y250'"
      :alt="datas.picUrl"
    />
    <el-empty :image-size="100" v-else description="加載中" />
    <div class="mask"></div>
    <div class="iconBox">
      <i class="iconfont icon-play_fill"></i>
      <div>{{ datas.subType || datas.type }}</div>
    </div>
    <div class="textWraper">
      {{ datas.name }}
    </div>
  </div>
</template>
<script setup>
defineProps({
  datas: {
    type: Object,
  },
});
</script>
<style lang="scss" scoped>
.CommonContainer {
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  .img {
    position: relative;
    padding-right: 1rem;
    &::before {
      content: "";
      top: 0;
      left: -5px;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #000;
      position: absolute;
      z-index: -1;
      transition: left 0.3s ease-in-out;
    }
    &:hover::before {
      left: 0px;
    }
  }
  .textWraper {
    padding-top: 0.5rem;
    padding-bottom: 1rem;
    letter-spacing: 1px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .iconBox {
    position: absolute;
    top: 5px;
    right: 20px;
    z-index: 2;
    width: 50%;
    color: #eee;
    font-size: 0.8rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    & > .iconfont {
      padding: 0;
      font-size: 1rem;
      cursor: unset;
    }
  }
}
</style>
