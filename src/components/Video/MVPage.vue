<template>
  <SkeletonGlobalLoading
    :loading="$store.state.mvDetail.loading"
    v-if="$store.state.mvDetail.loading"
  ></SkeletonGlobalLoading>

  <div v-else class="w-full p-4 flex">
    <!-- Media -->
    <div class="w-2/3 p-4">
      <VideoMedia :poster="mvDetail.data.cover" :src="mvUrl.url" />
      <!-- video Name -->
      <div class="pt-4 text-lg">
        <i class="iconfont icon-MV text-red-500 text-xl"></i>
        <span class="pl-3">
          {{ mvDetail.data.name }}
        </span>
      </div>

      <div class="text-sm text-gray-400 pt-3">
        <!-- publishTime -->
        <span class="pushtime"
          >发布: <span>{{ mvDetail.data.publishTime }}</span></span
        >
        <!-- playCount -->
        <span class="playCount pl-4"
          >播放次数:
          <span>{{
            $utils.extractPlayCountHandle(mvDetail.data.playCount)
          }}</span></span
        >
      </div>

      <div class="iconWrapper">
        <span class="iconBox">
          <i class="iconfont icon-good-fill"></i>
        </span>
        <span class="iconBox">
          <i class="iconfont icon-Group"></i>
          <span>{{ mvDetail.data.subCount }}</span>
        </span>
        <span class="iconBox">
          <i class="iconfont icon-share"></i>
          <span>{{ mvDetail.data.shareCount }}</span>
        </span>
      </div>
      <!-- comment post -->
      <CommentList
        :commentCount="mvDetail.data.commentCount"
        :hotComments="commentMv.hotComments"
        :comments="commentMv.comments"
        @onPageChange="onPageChange"
        :pageTotal="mvDetail.data.commentCount"
        :replyDatas="replyDatas"
        :refreshType="Types.SET_COMMENT_MV_REFRESH"
      />
    </div>

    <!-- aside -->
    <aside class="w-1/3">
      <!-- intro -->
      <div v-if="mvDetail.data.desc">
        <CommonSlotCard>
          <template #title> 视频简介 </template>
          <template #content>
            <div class="text">{{ mvDetail.data.desc }}</div>
          </template>
        </CommonSlotCard>
      </div>

      <!-- related Mv -->
      <CommonSlotCard>
        <template #title> 相关推荐 </template>
        <template #content>
          <div
            class="p-4 rounded"
            :key="item.id"
            v-for="item in relatedMV"
            @click="to_path_MV_Page(item.id)"
          >
            <VideoCard
              :artistName="item.artistName"
              :videoName="item.name"
              :duration="item.duration"
              :picUrl="item.cover"
              :playCount="item.playCount"
              :refreshType="Types.SET_COMMENT_VIDEO_REFRESH"
            />
          </div>
        </template>
      </CommonSlotCard>
    </aside>
  </div>
</template>
<script setup>
import { computed, onBeforeMount, watch } from "vue-demi";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Types from "@/store/types";
//components
import CommentList from "@/components/comment/CommentList.vue";
import CommonSlotCard from "@/components/cards/CommonSlotCard.vue";
import SkeletonGlobalLoading from "@/components/Skeleton/SkeletonGlobalLoading.vue";
import VideoMedia from "./VideoMedia.vue";
import VideoCard from "@/components/cards/VideoCard.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const mvDetail = computed(() => store.state.mvDetail.mvDetail);
const relatedMV = computed(() => store.state.mvDetail.relatedMV);
const commentMv = computed(() => store.state.comment.commentMv.datas);
const mvUrl = computed(() => store.state.mvDetail.mvUrl.data);
const replyDatas = computed(() => ({
  id: route.params.mvId,
  t: 1,
  type: 1,
}));

onBeforeMount(() => {
  store.dispatch(Types.FTECH_MV_DETAIL, {
    id: route.params.mvId,
    mvid: route.params.mvId,
  });
  store.dispatch(Types.FETCH_COMMENT_MV, {
    id: route.params.mvId,
    ...store.state.comment.commentMv.queryInfo,
  });
});

watch(
  [
    () => store.state.comment.commentMv.queryInfo,
    () => store.state.comment.likedstate,
  ],
  ([curQueryInfo, curLikeState]) => {
    store.dispatch(Types.FETCH_COMMENT_MV, {
      id: route.params.mvId,
      ...curQueryInfo,
      timestamp: Date.now() + curLikeState,
    });
  },
  {
    deep: true,
  }
);

const to_path_MV_Page = async (id) => {
  router.push({ path: `/mvUrl/${id}` });
};

const onPageChange = (curPage) => {
  const offset = (curPage - 1) * store.state.comment.commentMv.queryInfo.limit;
  store.commit(Types.SET_MV_COMMENT_PAGINATION, offset);
};
</script>
<style lang="scss" scoped>
.title {
  border-left: 3px solid #f00;
  & > span {
    margin-left: 1rem;
    letter-spacing: 1px;
    font-weight: 800;
  }
}
.text {
  padding: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.5;
}
.iconWrapper {
  padding-top: 1rem;
  .iconBox {
    padding: 1rem;
    padding-right: 3rem;
    & > .iconfont {
      font-size: 1.8rem;
      color: #999;
      transition: color 0.5s ease-in-out;
      &:hover {
        color: red;
      }
      & + span {
        padding-left: 0.5rem;
      }
    }
  }
}
.beforeTriangle {
  &::before {
    content: "";
    width: 15px;
    height: 10px;
    left: 0;
    bottom: 100%;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    position: absolute;
  }
}
</style>
