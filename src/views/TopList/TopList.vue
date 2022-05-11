<template>
  <SkeletonGlobalLoading
    :loading="$store.state.topList.loading"
    v-if="$store.state.topList.loading"
  ></SkeletonGlobalLoading>

  <div v-else class="flex gap-5">
    <!-- NavList -->
    <aside class="w-1/5">
      <div>
        <h3 class="py-3 font-bold text-xl">云音乐特色榜</h3>
        <TopListNavItem
          :list="list"
          :key="list.id"
          v-for="list in store.getters[Types.FILTER_HAS_TOPLISTTYPE]"
          v-model:selectedCurId="selectedCurId"
        />
      </div>
      <div class="pt-10">
        <h3 class="py-3 font-bold text-xl">全球媒体榜</h3>
        <TopListNavItem
          :list="list"
          :key="list.id"
          v-for="list in store.getters[Types.FILTER_NOT_HAS_TOPLISTTYPE]"
          v-model:selectedCurId="selectedCurId"
        />
      </div>
    </aside>
    <!-- detail -->
    <div class="flex-1">
      <SongListDesc
        :blurPicUrl="topListDetail.coverImgUrl"
        :name="topListDetail.name"
        :artistImg1v1Url="topListDetail.creator.avatarUrl"
        :artistName="topListDetail.creator.nickname"
        :enAliasName="topListDetail.englishTitle"
        :publishTime="topListDetail.createTime"
        :description="topListDetail.description"
        :songs="topListDetail.tracks"
        :trackIds="topListDetail.trackIds"
        disabledLineClamp
        disableCollection
      />

      <div>
        <CommentList
          :commentCount="commentPlaylist.total"
          :hotComments="commentPlaylist.hotComment"
          :comments="commentPlaylist?.comments"
          :pageTotal="commentPlaylist?.total"
          :pageSize="store.state.comment.commentPlaylist.queryInfo.limit"
          @onPageChange="onPageChange"
          :replyDatas="replyDatas"
          :refreshType="Types.SET_COMMENT_PLAYLIST_REFRESH"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import Types from "@/store/types";
import { computed, onBeforeMount, ref, watch } from "vue-demi";
import { useStore } from "vuex";
//components
import TopListNavItem from "./chlid/TopListNavItem.vue";
import CommentList from "@/components/comment/CommentList.vue";
import SongListDesc from "@/components/songList/SongListDesc.vue";
import SkeletonGlobalLoading from "@/components/Skeleton/SkeletonGlobalLoading.vue";
const store = useStore();
const curId = ref(store.state.topList?.topListDetail?.id);
const selectedCurId = computed({
  get() {
    return curId.value;
  },
  set(val) {
    curId.value = val;
  },
});

const topListDetail = computed(() => store.state.topList.topListDetail);
const commentPlaylist = computed(
  () => store.state.comment?.commentPlaylist?.datas || []
);
const replyDatas = computed(() => {
  return {
    id: selectedCurId.value ?? store.state.topList?.topListDetail?.id,
    t: 1,
    type: 2,
  };
});
onBeforeMount(() => {
  store.dispatch(Types.FETCH_TOPLIST_NAVBAR);
});

//監聽點擊排行榜
watch(selectedCurId, (cur) => {
  store.dispatch(Types.FETCH_TOPLIST_PLAYLIST_DETAIL, { id: cur });
  store.dispatch(Types.FETCH_COMMENT_PLAYLIST, {
    id: cur ?? store.state.topList?.topListDetail?.id,
    limit: 20,
    offset: 0,
  });
});

//監聽評論區換頁
watch(
  [
    () => store.state.comment.commentPlaylist.queryInfo,
    () => store.state.comment.likedstate,
  ],
  ([curQueryInfo, curLikedstate]) => {
    store.dispatch(Types.FETCH_COMMENT_PLAYLIST, {
      id: selectedCurId.value ?? store.state.topList?.topListDetail?.id,
      ...curQueryInfo,
      timestamp: Date.now() + curLikedstate,
    });
  },
  { deep: true }
);

const onPageChange = (curPage) => {
  const offset =
    (curPage - 1) * store.state.comment.commentPlaylist.queryInfo.limit;
  store.commit(Types.SET_PLAYLIST_COMMENT_PAGINATION, offset);
};
</script>
<style lang="scss"></style>
