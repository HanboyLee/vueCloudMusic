<template>
  <SkeletonGlobalLoading
    :loading="$store.state.videoChannel.detailLoading"
    v-if="$store.state.videoChannel.detailLoading"
  ></SkeletonGlobalLoading>

  <div v-else class="w-full p-4 flex">
    <!-- Media -->
    <div class="w-2/3 p-4">
      <VideoMedia
        :poster="videoDatas.detail.coverUrl"
        :src="videoDatas.videoUrl.url"
      />
      <!-- video Name -->
      <div class="pt-4 text-lg">
        <i class="iconfont icon-MV text-red-500 text-xl"></i>
        <span class="pl-3">
          {{ videoDatas.detail.title }}
        </span>
      </div>

      <div class="text-sm text-gray-400 pt-3">
        <!-- publishTime -->
        <span class="pushtime"
          >发布:
          <span
            >{{ $moment(videoDatas.detail.publishTime).format("yyyy-MM-DD") }}
          </span></span
        >
        <!-- playCount -->
        <span class="playCount pl-4"
          >播放次数:
          <span>{{
            $utils.extractPlayCountHandle(videoDatas.detail.praisedCount)
          }}</span></span
        >
      </div>

      <div class="iconWrapper">
        <span class="iconBox">
          <i class="iconfont icon-good-fill"></i>
          <span>{{ videoDatas.detail.praisedCount }}</span>
        </span>
        <span class="iconBox">
          <i class="iconfont icon-Group"></i>
          <span>{{ videoDatas.detail.subscribeCount }}</span>
        </span>
        <span class="iconBox">
          <i class="iconfont icon-share"></i>
          <span>{{ videoDatas.detail.shareCount }}</span>
        </span>
      </div>
      <!-- comment post -->
      <CommentList
        :commentCount="videoDatas.detail.commentCount"
        :hotComments="commentVideo.hotComments"
        :comments="commentVideo.comments"
        @onPageChange="onPageChange"
        :pageTotal="videoDatas.detail.commentCount"
        :replyDatas="replyDatas"
        :refreshType="Types.SET_COMMENT_VIDEO_REFRESH"
      />
    </div>

    <!-- aside -->
    <aside class="w-1/3">
      <!-- intro -->
      <div v-if="videoDatas.detail.description">
        <CommonSlotCard>
          <template #title> 视频简介 </template>
          <template #content>
            <div class="text">{{ videoDatas.detail.description }}</div>
          </template>
        </CommonSlotCard>
      </div>

      <!-- related Mv -->
      <CommonSlotCard>
        <template #title> 相关推荐 </template>
        <template #content>
          <div
            class="p-4 rounded"
            :key="item.vid"
            v-for="item in videoDatas.relatedVideo"
            @click="to_path_Video_Page(item.vid)"
          >
            <VideoCard
              :artistName="item.creator[0].userName"
              :videoName="item.title"
              :duration="item.durationms"
              :picUrl="item.coverUrl"
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
import VideoMedia from "@/components/Video/VideoMedia.vue";
import CommentList from "@/components/comment/CommentList.vue";
import CommonSlotCard from "@/components/cards/CommonSlotCard.vue";
import SkeletonGlobalLoading from "@/components/Skeleton/SkeletonGlobalLoading.vue";
import VideoCard from "@/components/cards/VideoCard.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const videoDatas = computed(() => store.state.videoChannel.videoDetail);
const commentVideo = computed(() => store.state.comment.commentVideo.datas);
const replyDatas = computed(() => ({
  id: route.params.videoId,
  t: 1,
  type: 5,
}));

onBeforeMount(() => {
  store.dispatch(Types.FETCH_VIDEO_DETAIL, {
    id: route.params.videoId,
  });
  store.dispatch(Types.FETCH_COMMENT_VIDEO, {
    id: route.params.videoId,
    ...store.state.comment.commentVideo.queryInfo,
  });
});

watch(
  [
    () => store.state.comment.commentVideo.queryInfo,
    () => store.state.comment.likedstate,
  ],
  ([curQueryInfo, curLikeState]) => {
    store.dispatch(Types.FETCH_COMMENT_VIDEO, {
      id: route.params.videoId,
      ...curQueryInfo,
      timestamp: Date.now() + curLikeState,
    });
  },
  {
    deep: true,
  }
);

const to_path_Video_Page = async (id) => {
  router.push({ path: `/videoUrl/${id}` });
};

const onPageChange = (curPage) => {
  const offset =
    (curPage - 1) * store.state.comment.commentVideo.queryInfo.limit;
  store.commit(Types.SET_COMMENT_VIDEO_PAGINATION, offset);
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
