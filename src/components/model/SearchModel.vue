<template>
  <div class="searchModel">
    <div
      class="bg-filter"
      @click.stop="$emit('update:isOpenSearchModel', false)"
    ></div>
    <div class="model">
      <SearchInput @onKeyupEnter="onKeyupEnter" />
      <div class="searchRecommentTag">
        <div class="flex-1">
          <div class="flex justify-between">
            <div class="flex items-center text-xl">
              <i class="iconfont icon-history text-red-500"></i>
              <span class="font-bold">历史搜索</span>
            </div>
            <div @click="onCleanHistory" class="text-red-500">清除</div>
          </div>

          <div class="flex-1">
            <ElTag
              class="mx-4 mt-2"
              :key="index"
              v-for="(tag, index) in $store.state.search.historyKeywords"
              closable
              @click="onTagNavagator(tag)"
              @close="onDelTag(tag)"
              >{{ tag }}</ElTag
            >
          </div>
        </div>
        <div class="flex-1">
          <div class="flex items-center text-xl">
            <i class="iconfont icon-rehot text-red-500"></i>
            <span class="font-bold">热门搜索 </span>
          </div>
          <div class="pt-4">
            <ElTag
              @click="onTagNavagator(tag.first)"
              class="mx-4 mt-2"
              :key="index"
              v-for="(tag, index) in $store.state.search.hotTags"
              >{{ tag.first }}
            </ElTag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Types from "@/store/types";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

//hooks
import { useTrackerToHistory } from "@/hooks/useTrackerToHistory";
//components
import SearchInput from "@/components/input/SearchInput.vue";
const store = useStore();
const router = useRouter();
const emit = defineEmits(["update:isOpenSearchModel"]);

const appendTracker = (val) => {
  router.push(`/search/${val}`);
  emit("update:isOpenSearchModel", false);
};
//記錄搜尋追蹤
const withTrackerToHistory = useTrackerToHistory();
const onKeyupEnter = (keyword) => {
  let trimVal = keyword.trim();
  if (!trimVal) return;
  withTrackerToHistory(trimVal, appendTracker);
};

const onTagNavagator = (value) => {
  withTrackerToHistory(value, appendTracker);
};
//清除所有tag
const onCleanHistory = () => store.commit(Types.CLEAN_SEARCH_HISTORY);
//清除當前指定tag
const onDelTag = (tag) => store.commit(Types.DELETE_SEARCH_TAG, tag);
</script>
<style lang="scss" scoped>
.searchModel {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .bg-filter {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .model {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    height: 60%;
    transform: translate(-50%, -50%);
    box-shadow: -1px -1px 10px rgba($color: #000, $alpha: 0.3);
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;

    & > .searchRecommentTag {
      flex: 1;
      background: #fff;
      display: flex;
      flex-direction: column;
      padding: 2rem;
    }
  }
}
.iconfont {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}
</style>
