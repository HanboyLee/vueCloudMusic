<template>
  <div>
    <div class="flex justify-between items-center">
      <SearchCommonLabel suffixText="首歌曲" :count="count" />
      <PlaySongsButton :songs="datas" />
    </div>
    <div class="py-4">
      <SongList :datas="datas" v-loading="$store.state.search.searchLoading" />
    </div>
  </div>
  <!-- 分頁 -->
  <SearchCommonPagination v-show="isHidePagination" :count="count" />
</template>
<script setup>
import { useSearchWatch } from "@/hooks/useSearchWatch";
//components
import SongList from "@/components/songList/SongList.vue";
import SearchCommonLabel from "./SearchCommonLabel.vue";
import SearchCommonPagination from "./SearchCommonPagination.vue";
import PlaySongsButton from "@/components/button/PlaySongsButton.vue";
let keys = { dataKey: "songs", countKey: "songCount" };

const { datas, count, isHidePagination } = useSearchWatch(keys);
</script>
<style lang="scss"></style>
