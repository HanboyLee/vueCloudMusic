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
      <SearchCommonLabel suffixText="个歌单" :count="count" />
    </div>
    <ElRow :gutter="30">
      <ElCol
        class="p-3 my-4 cursor-pointer"
        v-for="item in datas"
        :key="item.id"
        :span="4"
        @click="onPlaylistToDetail(item.id)"
      >
        <ImageCard
          :copywriter="item.copywriter"
          :playCount="item.playCount"
          :picUrl="item.coverImgUrl"
          :name="item.name"
        />
      </ElCol>
      <!-- <ElCol>
      <el-pagination
        class="pagination"
        v-model:currentPage="currentPage"
        layout="prev, pager, next"
        :total="singerDeatil.data.artist.albumSize"
        :page-size="30"
      />
    </ElCol> -->
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
import SearchCommonLabel from "./SearchCommonLabel.vue";
import ImageCard from "@/components/cards/ImageCard.vue";
import SearchCommonPagination from "./SearchCommonPagination.vue";
const router = useRouter();
let keys = { dataKey: "playlists", countKey: "playlistCount" };
const { datas, count, isHidePagination } = useSearchWatch(keys);
// const datas = computed(
//   () => store.state.search.searchData?.result?.playlists ?? []
// );
// const count = computed(
//   () => store.state.search.searchData?.result?.playlistCount ?? 0
// );

// onMounted(() => {
//   store.dispatch(
//     Types.FETCH_SEARCH_KEYWORDS_ASYNC,
//     store.state.search.queryInfo
//   );
// });
// watch(
//   () => store.state.search.queryInfo,
//   (curQueryInfo) => {
//     store.dispatch(Types.FETCH_SEARCH_KEYWORDS_ASYNC, curQueryInfo);
//   },
//   { deep: true }
// );

function onPlaylistToDetail(id) {
  router.push(`/playlist/${id}`);
}
</script>
<style lang="scss"></style>
