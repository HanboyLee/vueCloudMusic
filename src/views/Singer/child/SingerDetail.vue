<template>
  <div v-if="singerDeatil.code === 200" class="container">
    <div class="top">
      <div class="bdImg"></div>
      <div class="imgbox">
        <ElImage
          :src="singerDeatil.data.artist.cover + '?param=150y150'"
          fit="cover"
          :alt="singerDeatil.data.artist.cover"
        >
          <template #placeholder>
            <ElImage :src="loadingImg" alt="loading" />
          </template>
        </ElImage>
      </div>
      <div class="desc">{{ singerDeatil.data.artist.briefDesc }}</div>
      <div class="info">
        <div class="info-text">
          <p>{{ singerDeatil.data.artist.albumSize }}</p>
          <p>专辑数</p>
        </div>
        <div class="info-text">
          <p>{{ singerDeatil.data.artist.mvSize }}</p>
          <p>MV数</p>
        </div>
        <div class="info-text">
          <p>{{ singerDeatil.data.artist.musicSize }}</p>
          <p>单曲数</p>
        </div>
      </div>
    </div>

    <ElRow justify="center">
      <ElCol class="navCol my-4" :span="12">
        <el-tabs v-model="activeName" class="demo-tabs" type="card">
          <el-tab-pane label="歌手热门50首歌曲" name="singerHot50">
          </el-tab-pane>
          <el-tab-pane label="所有专辑" name="singerAlbum"> </el-tab-pane>
          <el-tab-pane label="相关MV" name="singerRelatedMv"> </el-tab-pane>
          <el-tab-pane label="艺人介绍" name="singerIntroduce"> </el-tab-pane>
          <el-tab-pane label="相似歌手" name="singerSimilar"> </el-tab-pane>
        </el-tabs>
      </ElCol>
      <ElCol :span="23">
        <SingerHot50 v-if="'singerHot50' === activeName" />
        <SingerAlbum v-else-if="'singerAlbum' === activeName" />
        <SingerRelatedMv v-else-if="'singerRelatedMv' === activeName" />
        <SingerIntroduce v-else-if="'singerIntroduce' === activeName" />
        <SingerSimilar v-else-if="'singerSimilar' === activeName" />
      </ElCol>
    </ElRow>
  </div>
  <SkeletonGlobalLoading
    :loading="singerDeatil.code !== 200"
    v-else
  ></SkeletonGlobalLoading>
</template>
<script setup>
import { computed, ref, onMounted } from "vue-demi";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Types from "@/store/types";

//components
import SingerHot50 from "./SingerHot50.vue";
import SingerAlbum from "./SingerAlbum.vue";
import SingerIntroduce from "./SingerIntroduce.vue";
import SingerRelatedMv from "./SingerRelatedMv.vue";
import SingerSimilar from "./SingerSimilar.vue";
import SkeletonGlobalLoading from "@/components/Skeleton/SkeletonGlobalLoading.vue";
//images
import loadingImg from "@/assets/images/Loading.gif";
const activeName = ref("singerHot50");
const route = useRoute();
const store = useStore();
const singerDeatil = computed(() => store.state.singer.singerDetail || []);
onMounted(() => {
  if (route.params.singerId) {
    store.dispatch(Types.SINGER_DETAIL_ASYNC, { id: route.params.singerId });
  }
});

// function onChangeTab({ paneName }) {
//   console.log(activeName, "??");
//   const currentPath = utils.tabsHandlerRoutePath({
//     parentPath: `/singer/${route.params.singerId}`,
//     paneName,
//   });
//   router.replace(currentPath);
// }
</script>
<style lang="scss" scoped>
.navCol {
  margin-top: 1rem;
  display: flex;
  text-align: center;
  overflow: hidden;
  border-radius: 5px;
}
.top {
  position: relative;
  height: 500px;

  .bdImg {
    background: url("@/assets/images/bg_singer.jpeg");
    z-index: 100;
    clip-path: polygon(0 0, 100% 0, 100% 80%, 70% 100%, 30% 100%, 0 80%);
    width: 100%;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
    }
  }
}
.imgbox {
  border-radius: 10px;
  overflow: hidden;
  height: 125px;
  width: 125px;
  border: 1px solid #fff;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  img,
  div {
    width: 100%;
    height: 100%;
  }
}
.desc {
  position: absolute;
  z-index: 1;
  color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 50%;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 150%;
}
.info {
  color: #fff;
  min-width: 30%;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  .info-text {
    text-align: center;
    & > p:first-child {
      font-size: 1.5rem;
    }
    & > p + p {
      font-size: 1rem;
      opacity: 0.8;
    }
  }
}
</style>
