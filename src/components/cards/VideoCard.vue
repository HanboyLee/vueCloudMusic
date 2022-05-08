<template>
  <div class="w-full">
    <div class="imgBox">
      <i class="iconfont icon-play-filling"></i>
      <i class="iconfont icon-play_fill" v-if="playCount"
        ><span>{{ $utils.extractPlayCountHandle(playCount) }}</span></i
      >
      <div class="imageBar">
        <div>
          {{ artistName }}
        </div>
        <div>{{ $utils.transforTime(duration, "ms") }}</div>
      </div>

      <ElImage
        class="img"
        :src="picUrl + '?param=250y150'"
        :lazy="true"
        fit="cover"
      >
        <template #placeholder>
          <ElImage class="h-44 w-full" fit="cover" :src="loadingImg" />
        </template>
      </ElImage>
    </div>
    <div class="videoName">
      <ElTooltip placement="top" :content="videoName">
        {{ videoName }}
      </ElTooltip>
    </div>
  </div>
</template>
<script setup>
import loadingImg from "@/assets/images/Loading.gif";
defineProps({
  artistName: {
    type: String,
  },
  playCount: {
    type: Number,
  },
  picUrl: {
    type: String,
  },
  videoName: {
    type: String,
  },
  duration: {
    type: Number,
  },
});
</script>
<style lang="scss" scoped>
.videoName {
  padding: 0.5rem;
  border: 1px solid #eee;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.imgBox {
  position: relative;
  /* min-width: 200px; */
  /* height: 200px; */
  cursor: pointer;
  .imageBar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: rgba($color: #000, $alpha: 0.3);
    color: #fff;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .img {
    height: 100%;
    width: 100%;
  }
  .icon-play_fill {
    font-size: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.3rem;
    z-index: 1;
    color: #fff;
  }

  .icon-play-filling {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    z-index: 1;
    color: rgba($color: #900, $alpha: 0.3);
    transition: color 0.3s ease-in-out;
  }
  &:hover .icon-play-filling {
    color: rgba($color: #f00, $alpha: 1);
  }
}
</style>
