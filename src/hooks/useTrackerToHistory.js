import Types from "@/store/types";
import { useStore } from "vuex";
//記錄搜尋追蹤
export const useTrackerToHistory = () => {
  const store = useStore();
  return (value, fn) => {
    const isExist = store.state.search.historyKeywords.includes(value);

    if (isExist) {
      store.commit(Types.ORDER_SEARCH_HISTORY, value);
    } else {
      store.commit(Types.PUSH_SEARCH_HISTORY, value);
    }
    store.commit(Types.SET_SEARCH_KEYWORD, value);
    if (typeof fn === "function") {
      fn(value);
    }
  };
};
