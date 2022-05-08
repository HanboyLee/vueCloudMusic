<template>
  <div @click="onCloseShowTags">
    <!-- Loading -->
    <div v-if="$store.state.playlist.loading">
      <div class="px-4">
        <SkeletonTagBar />
        <ElRow>
          <ElCol
            :span="4"
            :key="item"
            v-for="item in store.state.playlist.queryInfo.limit"
          >
            <SkeletonImageCard />
          </ElCol>
        </ElRow>
      </div>
    </div>
    <!-- main -->
    <div v-else class="relative">
      <!-- tagModel -->
      <TagModel v-if="isShowTagModel" v-model="isShowTagModel" />
      <div class="px-4">
        <div class="rounded bg-opacity-20 bg-black h-16">
          <TagBar
            :isShowTagModel="isShowTagModel"
            :tagDatas="hotTag"
            @onCheckChange="(item) => onCheckChange(item)"
            @onShowTags="onShowTags"
            :currentTagId="$store.state.playlist.queryInfo.cat"
          >
            <template #categoryTitle> 选择分类 </template>
            <template #outsideTagTitle> 热门标签 </template>
          </TagBar>
        </div>
      </div>
      <ElRow>
        <ElCol
          class="p-3 my-4 cursor-pointer"
          v-for="item in playlists.playlists"
          :key="item.id"
          :span="3"
          @click="onPlaylistToDetail(item.id)"
        >
          <ImageCard
            :copywriter="item.copywriter"
            :playCount="item.playCount"
            :picUrl="item.coverImgUrl"
            :name="item.name"
          />
        </ElCol>

        <ElCol class="pt-10" :span="24">
          <el-pagination
            class="justify-center"
            :total="playlists.total"
            v-model:current-page="curPage"
            layout="prev, pager, next"
            background
            :page-size="store.state.playlist.queryInfo.limit"
          />
        </ElCol>
      </ElRow>
    </div>
  </div>
</template>
<script setup>
import Types from "@/store/types";
import { computed, onBeforeMount, ref, watch } from "vue-demi";
import * as vuex from "vuex";
import { useRouter } from "vue-router";
//components
import TagModel from "./chlid/TagModel.vue";
import ImageCard from "@/components/cards/ImageCard.vue";
import TagBar from "@/components/tag/TagBar.vue";
import SkeletonTagBar from "@/components/Skeleton/SkeletonTagBar.vue";
import SkeletonImageCard from "@/components/Skeleton/SkeletonImageCard.vue";
const curPage = ref(1);
const isShowTagModel = ref(false);
const store = vuex.useStore();
const router = useRouter();
const playlists = computed(() => store.state.playlist.playlists);
const hotTag = computed(
  () => store.state.playlist.hotTag.map((item) => item.name) || []
);

onBeforeMount(() => {
  store.dispatch(Types.FETCH_PLAYLIST_INITIAL_ASYNC);
});
watch(
  () => curPage.value,
  (cur) => {
    const offset = (cur - 1) * store.state.playlist.queryInfo.limit;
    store.commit(Types.SET_PLAYLIST_PAGINATION, offset);
  }
);
watch(
  () => store.state.playlist.queryInfo,
  (curQueryInfo) => {
    store.dispatch(Types.FETCH_UPDATE_PLAYLIST_ASYNC, curQueryInfo);
  },
  { deep: true }
);

function onCheckChange(item) {
  store.commit(Types.SELECTED_CURRENT_TAG, item);
  isShowTagModel.value = false;
}
function onShowTags() {
  isShowTagModel.value = !isShowTagModel.value;
}
function onCloseShowTags() {
  isShowTagModel.value = false;
}
function onPlaylistToDetail(id) {
  router.push(`/playlist/${id}`);
}
</script>
<style lang="scss" scoped></style>
