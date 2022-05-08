<template>
  <ElRow v-if="$store.state.search.searchLoading">
    <ElCol
      class="m-4"
      :key="item"
      :span="4"
      v-for="item in $store.state.search.queryInfo.limit"
    >
      <SkeletonImageCard :areaImg="{ width: '180px', height: '100px' }" />
    </ElCol>
  </ElRow>
  <div v-else>
    <div>
      <SearchCommonLabel suffixText="个视频" :count="count" />
    </div>
    <ElRow>
      <ElCol
        class="m-4"
        :key="item.id"
        :span="4"
        v-for="item in datas"
        @click="to_path_MV_Page(item.id)"
      >
        <VideoCard
          :id="item.id"
          :artistName="item.artistName"
          :playCount="item.playCount"
          :picUrl="item.cover"
          :videoName="item.name"
          :duration="item.duration"
        />
      </ElCol>
    </ElRow>
  </div>
  <!-- 分頁 -->
  <SearchCommonPagination v-show="isHidePagination" :count="count" />
</template>
<script setup>
import { useRouter } from "vue-router";
//hooks
import { useSearchWatch } from "@/hooks/useSearchWatch";
//components
import VideoCard from "@/components/cards/VideoCard.vue";
import SearchCommonLabel from "./SearchCommonLabel.vue";
import SearchCommonPagination from "./SearchCommonPagination.vue";
import SkeletonImageCard from "@/components/Skeleton/SkeletonImageCard.vue";

let keys = { dataKey: "mvs", countKey: "mvCount" };
const { datas, count, isHidePagination } = useSearchWatch(keys);
const router = useRouter();
const to_path_MV_Page = async (id) => {
  router.push({ path: `/mvUrl/${id}` });
};
</script>
<style lang="scss"></style>
