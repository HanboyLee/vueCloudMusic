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
      <SearchCommonLabel suffixText="个歌手" :count="count" />
    </div>
    <ElRow class="listsContainer">
      <ElCol
        :span="4"
        v-for="(item, index) in datas"
        :key="index"
        class="listItem"
        @click="onSingerDetail(item.id)"
      >
        <SingerCard :picUrl="item.picUrl" :name="item.name">
          <template #albumSize> 专辑数{{ item.albumSize }} </template>
        </SingerCard>
      </ElCol>
    </ElRow>
  </div>
  <!-- 分頁 -->
  <SearchCommonPagination v-show="isHidePagination" :count="count" />
</template>
<script setup>
import SearchCommonLabel from "./SearchCommonLabel.vue";
import SingerCard from "@/components/cards/SingerCard.vue";
import { useRouter } from "vue-router";
import { useSearchWatch } from "@/hooks/useSearchWatch";
import SearchCommonPagination from "./SearchCommonPagination.vue";

const router = useRouter();
let keys = { dataKey: "artists", countKey: "artistCount" };
const { datas, count, isHidePagination } = useSearchWatch(keys);

function onSingerDetail(id) {
  router.push(`/singer/${id}`);
}
</script>
<style lang="scss"></style>
