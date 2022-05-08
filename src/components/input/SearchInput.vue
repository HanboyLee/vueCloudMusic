<template>
  <div class="searchArea" :style="{ flex: flexible }">
    <div class="searchInputBox">
      <input
        class="searchInput"
        placeholder="请输入搜索关键词并按回车键…"
        type="text"
        v-model="inputText"
        @keypress.enter="$emit('onKeyupEnter', inputText)"
      />
      <i
        @click="$emit('onKeyupEnter', inputText)"
        class="iconfont icon-search text-sky-400"
      ></i>
    </div>
  </div>
</template>
<script setup>
import { useDebouncedRef } from "@/hooks/useDebounceRef";
defineProps({
  flexible: {
    type: Number,
    default: 0.5,
  },
});
defineEmits(["onKeyupEnter"]);
const inputText = useDebouncedRef();

defineExpose({ inputText });
</script>
<style lang="scss" scoped>
.searchArea {
  display: flex;
  align-items: center;
  /* background: rgba($color: #000000, $alpha: 0.3); */

  .searchInputBox {
    margin: 0 auto;
    width: 80%;
    display: flex;
    overflow: hidden;
    border-radius: 5px;
    background: #fff;
    align-items: center;
    padding: 5px;
    box-shadow: 1px 1px 5px rgba($color: #000000, $alpha: 0.3);
    & > .searchInput {
      flex: 1;
      width: 100%;
      line-height: 54px;
      display: inline-block;
      outline: none;
      border: none;
      font-size: 1.2rem;
      text-align: center;
    }
    & > i {
      font-size: 20px;
      cursor: pointer;
      padding: 0.5rem;
    }
  }
}
</style>
