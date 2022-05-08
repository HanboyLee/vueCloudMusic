<template>
  <ElRow v-if="$store.state.search.searchLoading">
    <ElCol
      :key="item"
      :span="4"
      v-for="item in $store.state.search.queryInfo.limit"
    >
      <SkeletonImageCard />
    </ElCol>
  </ElRow>
  <div v-else>
    <div>
      <SearchCommonLabel suffixText="张专辑" :count="count" />
    </div>
    <ElRow :gutter="30">
      <ElCol
        @click="onToDeatil(item.id)"
        :span="4"
        v-for="(item, index) in datas"
        :key="index"
      >
        <CommonCard :datas="item" />
      </ElCol>
    </ElRow>
  </div>
  <!-- 分頁 -->
  <SearchCommonPagination v-show="isHidePagination" :count="count" />
</template>
<script setup>
import { useRouter } from "vue-router";
import { useSearchWatch } from "@/hooks/useSearchWatch";
//components
import CommonCard from "@/components/cards/CommonCard.vue";
import SearchCommonLabel from "./SearchCommonLabel.vue";
import SearchCommonPagination from "./SearchCommonPagination.vue";
import SkeletonGlobalLoading from "@/components/Skeleton/SkeletonGlobalLoading.vue";
import SkeletonImageCard from "@/components/Skeleton/SkeletonImageCard.vue";
const router = useRouter();
let keys = { dataKey: "albums", countKey: "albumCount" };
const { datas, count, isHidePagination } = useSearchWatch(keys);

function onToDeatil(id) {
  router.push(`/songListDetail/${id}`);
}
</script>
<style lang="scss"></style>
