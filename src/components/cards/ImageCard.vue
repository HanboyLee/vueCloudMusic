<template>
  <div class="card" :body-style="{ padding: '0px' }">
    <div
      class="tag"
      :class="[copywriter ? 'justify-center' : 'justify-end pr-4']"
    >
      <span v-if="copywriter">{{ copywriter }}</span>
      <div class="flex justify-center items-center">
        <i class="iconfont icon-play_fill p-0"></i>
        <span>{{ $utils.extractPlayCountHandle(playCount) }}</span>
      </div>
    </div>
    <img v-if="picUrl" class="img" :src="picUrl + '?param=250y250'" />
    <el-empty v-else :image-size="100" description="加載中" />
    <div class="nameWrapper">
      <span class="name">{{ name }}</span>
    </div>
  </div>
</template>
<script setup>
defineProps(["copywriter", "playCount", "picUrl", "name"]);
</script>
<style lang="scss" scoped>
.card {
  position: relative;
  height: 150px;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 90%;
    top: 5%;
    right: -3%;
    background: rgba(0, 0, 0, 0.3);
    z-index: -2;
  }
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 80%;
    top: 10%;
    right: -6%;
    background: rgba(0, 0, 0, 0.2);
    z-index: -1;
  }
  .tag {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    z-index: 1;
    color: #fff;
    font-size: 0.8rem;
    border-radius: 5px 5px 0 0;
    .iconfont {
      color: #fff;
      font-size: 1.2rem;
    }
    &::before {
      content: "";
      display: block;
      position: absolute;
      right: -20px;
      top: 0;
      width: 100%;
      height: 100%;
    }

    > span {
      line-height: 30px;
    }
  }

  .img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    position: relative;
    border-radius: 5px;
  }
  .nameWrapper {
    padding: 0.5rem 0;
    .name {
      font-size: 0.9rem;
      text-align: center;
      color: #000;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; //显示两行
    }
  }
}
</style>
