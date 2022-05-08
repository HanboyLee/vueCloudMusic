import Types from "@/store/types";
import { computed, watch } from "vue";
import { useStore } from "vuex";

// for child of  Search Page
export const useSearchWatch = ({ dataKey, countKey }) => {
  const store = useStore();
  const datas = computed(
    () => store.state.search.searchData?.result?.[dataKey] ?? []
  );
  const count = computed(
    () => store.state.search.searchData?.result?.[countKey] ?? 0
  );
  const isHidePagination = computed(
    () =>
      !store.state.search.searchLoading &&
      count.value >= store.state.search.queryInfo.limit
  );

  watch(
    () => store.state.search.queryInfo,
    (curQueryInfo) => {
      store.dispatch(Types.FETCH_SEARCH_KEYWORDS_ASYNC, curQueryInfo);
    },
    { deep: true, immediate: true }
  );
  return {
    datas,
    count,
    isHidePagination,
  };
};
