<template>
  <SkeletonGlobalLoading
    :loading="loading"
    v-if="loading"
  ></SkeletonGlobalLoading>
  <div v-else class="flex">
    <div class="flex-1 w-">
      <SongListDesc
        :id="route.params.detailId"
        :blurPicUrl="playlistInfo.coverImgUrl"
        :name="playlistInfo.name"
        :artistImg1v1Url="playlistInfo.creator.avatarUrl"
        :artistName="playlistInfo.creator.nickname"
        :publishTime="playlistInfo.createTime"
        :description="playlistInfo.description"
        :songs="songs"
        :isCollection="playlistInfo.subscribed"
        :collectionType="Types.FETCH_PLAYLIST_SUBCRIBE_ASYNC"
      >
        <template #tag v-if="playlistInfo.tags.length">
          <div class="flex items-center">
            <div>标签：</div>
            <TagItem
              @onCheckChange="onCheckChange"
              :data="tag"
              :key="tag"
              v-for="tag in playlistInfo.tags"
            />
          </div>
        </template>
        <template #listInfo>
          <div class="flex items-center justify-between p-2">
            <div>
              <span class="text-xl">歌曲列表 </span>
              <span class="pl-4 text-sm text-gray-500"
                >{{ playlistInfo.trackCount }}首歌</span
              >
            </div>
            <div class="text-sm text-gray-500">
              播放：<span class="text-red-500 px-1">{{
                playlistInfo.playCount
              }}</span
              >次
            </div>
          </div>
        </template>
      </SongListDesc>
      <CommentList
        :commentCount="commentPlaylist.total"
        :hotComments="commentPlaylist.hotComment"
        :comments="commentPlaylist.comments"
        :pageTotal="commentPlaylist.total"
        :pageSize="store.state.comment.commentPlaylist.queryInfo.limit"
        @onPageChange="onPageChange"
        :replyDatas="replyDatas"
        :refreshType="Types.SET_COMMENT_PLAYLIST_REFRESH"
      />
    </div>
    <!-- aside -->
    <div class="w-1/4 p-1">
      <div v-if="playlistInfo.subscribers.length">
        <CommonSlotCard>
          <template #title>喜欢这个歌单的人</template>
          <template #content>
            <ElRow justify="center" class="p-4 text-center">
              <ElCol
                class="pt-4"
                :key="subscriber.id"
                :span="6"
                v-for="subscriber in playlistInfo.subscribers"
              >
                <el-tooltip :content="subscriber.nickname" placement="top">
                  <ElAvatar
                    shape="square"
                    :src="subscriber.avatarUrl"
                    :alt="subscriber.nickname"
                  />
                </el-tooltip>
              </ElCol>
            </ElRow>
          </template>
        </CommonSlotCard>
      </div>

      <div>
        <CommonSlotCard>
          <template #title>相关推荐 </template>
          <template #content>
            <div class="p-4">
              <div
                :key="related.id"
                class="flex gap-3 items-center pt-3"
                v-for="related in playListRelated"
              >
                <ElImage
                  class="w-10 h-10"
                  :src="related.coverImgUrl"
                  shape="square"
                  fit="cover"
                />
                <div class="flex-1 overflow-hidden">
                  <el-tooltip :content="related.name" placement="top">
                    <div
                      class="overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
                      @click="onToPlaylistDetail(related.id)"
                    >
                      {{ related.name }}
                    </div>
                  </el-tooltip>
                  <div class="text-sm text-gray-500">
                    by {{ related.creator.nickname }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </CommonSlotCard>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onBeforeMount, onUnmounted, watch } from "vue-demi";
import TagItem from "@/components/tag/TagItem.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Types from "@/store/types";

import CommonSlotCard from "@/components/cards/CommonSlotCard.vue";
import CommentList from "@/components/comment/CommentList.vue";
import SkeletonGlobalLoading from "@/components/Skeleton/SkeletonGlobalLoading.vue";
import SongListDesc from "@/components/songList/SongListDesc.vue";
const route = useRoute();
const router = useRouter();
const store = useStore();

const songs = computed(() => {
  return store.state.playlist.playListTrackAllSongs || [];
});
const playlistInfo = computed(() => {
  return store.state.playlist.playlistDetail || [];
});
const playListRelated = computed(() => {
  return store.state.playlist.playListRelated || [];
});
const commentPlaylist = computed(
  () => store.state.comment.commentPlaylist.datas
);
const loading = computed(() => store.state.playlist.loading);
const replyDatas = computed(() => {
  return {
    id: route.params.detailId,
    t: 1,
    type: 2,
  };
});
//監聽評論區換頁
watch(
  () => store.state.comment.commentPlaylist.queryInfo,
  (curQueryInfo) => {
    store.dispatch(Types.FETCH_COMMENT_PLAYLIST, {
      id: route.params.detailId,
      ...curQueryInfo,
    });
  },
  { deep: true }
);
//變更評論頁數
const onPageChange = (curPage) => {
  const offset =
    (curPage - 1) * store.state.comment.commentPlaylist.queryInfo.limit;
  store.commit(Types.SET_PLAYLIST_COMMENT_PAGINATION, offset);
};
//init
onBeforeMount(() => {
  store.dispatch(Types.FETCH_PLAYLIST_DETAIL_ASYNC, {
    id: route.params.detailId,
    timeStamp: Date.now(),
  });
  store.dispatch(Types.FETCH_COMMENT_PLAYLIST, {
    id: route.params.detailId,
  });
});

// reflash the queryInfo after leave page
onUnmounted(() => {
  store.commit(Types.RESET_COMMNET);
});

const onCheckChange = (tag) => {
  console.log(tag, "tag");
};

const onToPlaylistDetail = (id) => {
  router.push(`/playlist/${id}`);
};
</script>
<style lang="scss">
.rightSider {
  padding: 0 2rem;
  .commonContent {
    padding-top: 1rem;
  }
}
.introduce {
  padding-bottom: 2rem;
  display: flex;
  align-items: flex-start;
  .img {
    min-width: 250px;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 1rem;
  }
  .artistContent {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    .artist {
      font-size: 1.1rem;
      & > span {
        padding: 0.5rem;
        &:first-child {
          color: red;
        }
      }
      & > span + span {
        color: #999;
      }
    }
  }
}
.albumDesc {
  & > p {
    line-height: 1.5;
  }
  .descText {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .extend {
    color: blue;
    text-align: end;
    padding: 0.5rem;
  }
}
</style>
