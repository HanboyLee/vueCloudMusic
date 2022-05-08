<template>
  <el-pagination
    class="pagination"
    v-model:currentPage="currentPage"
    layout="prev, pager, next"
    :total="count"
    :page-size="store.state.search.queryInfo.limit"
  />
</template>
<script setup>
import Types from "@/store/types";
import { ref, watch } from "vue";
import { useStore } from "vuex";

const currentPage = ref(1);
const store = useStore();
defineProps({
  count: {
    type: Number,
    default: 0,
  },
});
watch(
  () => currentPage.value,
  (curPage) => {
    let offset = (curPage - 1) * store.state.search.queryInfo.limit;
    store.commit(Types.SET_SEARCH_OFFSET, offset);
  }
);
</script>
<style lang="scss">
.pagination {
  padding: 2rem 0;
  justify-content: center;
  & > .number,
  .el-icon {
    font-size: 1.3rem !important;
  }
}
</style>
