<template>
  <div v-if="$store.state.videoChannel.groupLoading">
    <ElRow :gutter="20">
      <ElCol :span="24">
        <SkeletonTagBar />
      </ElCol>
      <ElCol class="my-4" :key="item" :span="6" v-for="item in 8">
        <SkeletonImageCard :areaImg="{ width: '260px', height: '120px' }" />
      </ElCol>
    </ElRow>
  </div>
  <div v-else>
    <div class="px-4">
      <div class="rounded bg-opacity-20 bg-black h-16">
        <TagBar
          :isShowTagModel="isShowTagModel"
          :tagDatas="$store.state.videoChannel.categoryTags"
          @onCheckChange="onCheckChange"
          @onShowTags="onShowTags"
          :currentTagId="$store.state.videoChannel.groupQueryInfo.id"
        >
          <template #categoryTitle> 选择分类 </template>
          <template #outsideTagTitle> 分类 </template>
        </TagBar>
        <VideoTagModel
          v-if="isShowTagModel"
          v-model:isShowTagModel="isShowTagModel"
          @onCheckChange="onCheckChange"
        />
      </div>
      <ElRow :gutter="20">
        <ElCol
          class="my-4"
          :key="videoData.data.vid"
          :span="6"
          v-for="videoData in $store.state.videoChannel.groupVideoData.datas"
          @click="to_path_Video_Page(videoData.data.vid)"
        >
          <VideoCard
            :artistName="videoData.data.creator.nickname"
            :playCount="videoData.data.praisedCount"
            :picUrl="videoData.data.coverUrl"
            :videoName="videoData.data.title"
            :duration="videoData.data.durationms"
          />
        </ElCol>
        <ElCol :span="24" class="text-center">
          <i
            :class="['iconfont icon-left mx-4', isCriticalLeft && 'critical']"
            @click="onPrev"
          ></i>
          <i
            :class="[
              'iconfont icon-right1 mx-4',
              isNotCriticalRight && 'critical',
            ]"
            @click="onNext"
          ></i>
        </ElCol>
      </ElRow>
    </div>
  </div>
</template>
<script setup>
import Types from "@/store/types";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
//components
import VideoTagModel from "./child/VideoTagModel.vue";
import TagBar from "@/components/tag/TagBar.vue";
import VideoCard from "@/components/cards/VideoCard.vue";
import SkeletonImageCard from "@/components/Skeleton/SkeletonImageCard.vue";
import SkeletonTagBar from "@/components/Skeleton/SkeletonTagBar.vue";

const store = useStore();
const router = useRouter();
const isShowTagModel = ref(false);

const isCriticalLeft = computed(
  () => store.state.videoChannel.groupQueryInfo.offset === 0
);
const isNotCriticalRight = computed(
  () => !store.state.videoChannel.groupVideoData.hasmore
);
onBeforeMount(() => {
  store.dispatch(Types.FETCH_VIDEO_INIT);
});

watch(
  () => store.state.videoChannel.groupQueryInfo,
  (curQueryInfo) => {
    store.dispatch(Types.FETCH_VIDEO_GROUP, curQueryInfo);
  },
  {
    deep: true,
  }
);

const onPrev = () => {
  if (isCriticalLeft.value) return;
  store.commit(Types.SET_VIDEO_GROUP_OFFSET, -1);
};
const onNext = () => {
  if (isNotCriticalRight.value) return;
  store.commit(Types.SET_VIDEO_GROUP_OFFSET, 1);
};
const onCheckChange = (item) => {
  store.commit(Types.SET_VIDEO_CURRENT_ID, item);
};
const onShowTags = () => {
  isShowTagModel.value = !isShowTagModel.value;
};
const to_path_Video_Page = (id) => {
  router.push(`/videoUrl/${id}`);
};
</script>
<style lang="scss" scoped>
.iconfont {
  color: #000;
}
.critical {
  cursor: no-drop;
  color: #eee;
}
</style>
