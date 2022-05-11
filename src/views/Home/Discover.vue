<template>
  <SkeletonGlobalLoading
    :loading="$store.state.discover.loading"
    v-if="$store.state.discover.loading"
  ></SkeletonGlobalLoading>

  <div v-else class="container">
    <!-- 輪播圖 -->
    <Carosel :banners="state.banners" />
    <!-- 推荐歌单 -->
    <ElRow>
      <ElCol class="py-4">
        <div class="flex items-center">
          <div
            @click="$router.push('/playlist')"
            class="text-xl cursor-pointer"
          >
            推荐歌单
          </div>
          <i class="iconfont icon-right"></i>
        </div>
      </ElCol>
      <ElCol
        class="p-5 my-4 cursor-pointer"
        v-for="item in state.personalized"
        :key="item.id"
        :span="4"
        @click="$router.push(`/playlist/${item.id}`)"
      >
        <ImageCard
          :copywriter="item.copywriter"
          :playCount="item.playCount"
          :picUrl="item.picUrl"
          :name="item.name"
        />
      </ElCol>
    </ElRow>
    <!-- 推荐新歌曲 -->
    <ElRow class="boxConatiner">
      <ElCol class="p-4 m-4">
        <div class="flex items-center">
          <div
            @click="
              $router.push({
                path: '/topList',
              })
            "
            class="text-xl cursor-pointer"
          >
            推荐新歌曲
          </div>
          <i class="iconfont icon-right"></i>
        </div>
      </ElCol>
      <ElCol
        class="p-4 m-4 shadow-lg rounded"
        :span="11"
        v-for="item in state.newSong"
        :key="item.id"
        @click="onAddSong(item)"
      >
        <SongCard
          :artists="item.song.artists"
          :picUrl="item.picUrl"
          :id="item.id"
          :songName="item.song.name"
          :duration="item.song.duration"
        />
      </ElCol>
    </ElRow>

    <!-- 最新ＭＶ -->
    <ElRow class="boxConatiner py-4">
      <ElCol>
        <div class="flex items-center">
          <div
            @click="$router.push('/mvlatest')"
            class="text-xl cursor-pointer"
          >
            最新ＭＶ
          </div>
          <i class="iconfont icon-right"></i>
        </div>
      </ElCol>
      <ElCol
        class="p-4"
        :span="6"
        v-for="item in state.newMv"
        :key="item.id"
        @click="to_path_MV_Page(item.id)"
      >
        <VideoCard
          :artistName="item.artistName"
          :playCount="item.playCount"
          :picUrl="item.picUrl"
          :videoName="item.name"
          :duration="item.duration"
        />
      </ElCol>
    </ElRow>
  </div>
</template>
<script setup>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import Types from "@/store/types";
import { useRouter } from "vue-router";

//component
import Carosel from "./child/Carosel.vue";
import ImageCard from "@/components/cards/ImageCard.vue";
import SongCard from "@/components/cards/SongCard.vue";
import VideoCard from "@/components/cards/VideoCard.vue";
import SkeletonGlobalLoading from "@/components/Skeleton/SkeletonGlobalLoading.vue";

const store = useStore();
const router = useRouter();
const state = computed(() => store.state.discover);
onMounted(() => {
  store.dispatch(Types.FETCH_DISCOVER_ASYNC);
});
const onAddSong = (song) => {
  store.dispatch(Types.FETCH_SONG_ASYNC, song);
};
const to_path_MV_Page = async (id) => {
  router.push({ path: `/mvUrl/${id}` });
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
}

h3 {
  margin-top: 3rem 0;
  font-weight: 800;
  letter-spacing: 2px;
  cursor: pointer;
  display: inline-block;
  color: #555;
  &:hover {
    color: #222;
  }
}

.boxConatiner {
  margin: 2rem 0;
}
.privateWrap {
  border-radius: 0 0 5px 5px;
  cursor: pointer;
}
.privateImg {
  width: 100%;
  height: 100%;
  border-radius: 5px 5px 0 0;
}
.privateName {
  padding: 0.5rem;
  line-height: 2;
}
.newSongItem {
  padding: 1rem;
  box-shadow: -1px 1px 22px -8px;
  border-radius: 5px;
  margin: 1rem;
}
</style>
