<template>
  <div>
    <!-- Search -->
    <div
      :style="{ background: `url(${bg_singer})` }"
      class="h-48 flex justify-center"
    >
      <SearchInput :flexible="1" @onKeyupEnter="onKeyupEnter" />
    </div>
    <div class="mt-8 flex items-center ml-4">
      <div class="text-xl text-gray-500 mr-4">歌曲搜尋</div>
      <el-tabs v-model="typeMode" class="demo-tabs" type="card">
        <el-tab-pane
          v-for="child in childList"
          :label="child.title"
          :name="child.id"
          :key="child.id"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <div>
    <Child />
  </div>
</template>
<script setup>
import Types from "@/store/types";
import { computed, markRaw, onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

//images
import bg_singer from "@/assets/images/bg_singer.jpeg";
import { useTrackerToHistory } from "@/hooks/useTrackerToHistory";
//components
import SearchInput from "@/components/input/SearchInput.vue";
import SearchAlbum from "./chlid/SearchAlbum.vue";
import SearchPlaylist from "./chlid/SearchPlaylist.vue";
import SearchSinger from "./chlid/SearchSinger.vue";
import SearchSongs from "./chlid/SearchSongs.vue";
import SearchVideo from "./chlid/SearchVideo.vue";

const typeMode = ref(1);
const store = useStore();
const router = useRouter();
const childList = ref([
  {
    id: 1,
    Com: markRaw(SearchSongs),
    title: "单曲",
  },
  {
    id: 10,
    Com: markRaw(SearchAlbum),
    title: "专辑",
  },
  {
    id: 1000,
    Com: markRaw(SearchPlaylist),
    title: "歌单",
  },
  {
    id: 100,
    Com: markRaw(SearchSinger),
    title: "歌手",
  },
  {
    id: 1004,
    Com: markRaw(SearchVideo),
    title: "视频",
  },
]);

//計算current typemode 是哪一個子組件
const Child = computed(
  () => childList.value.find((v) => v.id === typeMode.value).Com
);

//記錄搜尋追蹤
const withTrackerToHistory = useTrackerToHistory();

const onKeyupEnter = (keyword) => {
  let trimVal = keyword.trim();
  if (!trimVal) return;
  withTrackerToHistory(trimVal);
};

//監聽tabs 變化
watch(
  typeMode,
  (curType) => {
    store.commit(Types.SET_SEARCH_TYPE, curType);
    store.commit(Types.SET_SEARCH_OFFSET, 0);
  },
  { immediate: true }
);

//監測是否有keyword存在
onBeforeMount(() => {
  if (!store.state.search.queryInfo.keywords) {
    router.replace("/");
  }
});
</script>
<style lang="scss">
.el-tabs__item.is-active {
  border-bottom-color: unset !important;
}
.el-tabs__header {
  margin: unset !important;
}
</style>
