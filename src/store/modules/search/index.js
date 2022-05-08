import * as Api from "../../../services/api/search";

import Types from "@/store/types";

const state = {
  searchData: {},
  historyKeywords: [],
  hotTags: [],
  queryInfo: {
    keywords: "",
    limit: 30,
    offset: 0,
    type: 1,
  },
  searchLoading: false,
};

const getters = {};

const mutations = {
  [Types.SET_SEARCH_KEYWORD](state, payload) {
    state.queryInfo.keywords = payload;
  },
  [Types.PUSH_SEARCH_HISTORY](state, payload) {
    state.historyKeywords.unshift(payload);
  },
  [Types.ORDER_SEARCH_HISTORY](state, payload) {
    let extractHistoryKeywords = state.historyKeywords.filter(
      (item) => item !== payload
    );
    state.historyKeywords = [payload, ...extractHistoryKeywords];
  },
  [Types.DELETE_SEARCH_TAG](state, payload) {
    state.historyKeywords = state.historyKeywords.filter(
      (item) => item !== payload
    );
  },
  [Types.CLEAN_SEARCH_HISTORY](state) {
    state.historyKeywords = [];
  },
  [Types.SET_SEARCH_HOT_TAGS](state, payload) {
    state.hotTags = payload.hots;
  },
  [Types.SET_SEARCH_TYPE](state, payload) {
    state.queryInfo.type = payload;
  },
  [Types.SET_SEARCH_KEYWORDS_DATAS](state, payload) {
    state.searchData = payload;
  },
  [Types.SET_SEARCH_OFFSET](state, payload) {
    state.queryInfo.offset = payload;
  },
  [Types.SET_SEARCH_LOADING](state, payload) {
    state.searchLoading = payload;
  },
};

const actions = {
  async [Types.FETCH_SEARCH_HOT_TAG_ASYNC]({ commit }) {
    try {
      const { result } = await Api.getSearchHotTags();
      commit(Types.SET_SEARCH_HOT_TAGS, result);
    } catch (error) {
      console.log(error, "FETCH_VIDEO_INIT");
    }
  },
  async [Types.FETCH_SEARCH_KEYWORDS_ASYNC]({ commit }, params) {
    try {
      commit(Types.SET_SEARCH_LOADING, true);
      const datas = await Api.getSearch(params);
      commit(Types.SET_SEARCH_KEYWORDS_DATAS, datas);
      commit(Types.SET_SEARCH_LOADING, false);
    } catch (error) {
      console.log(error, "FETCH_SEARCH_KEYWORDS_ASYNC");
    }
  },
};

export const search = {
  state,
  getters,
  mutations,
  actions,
};
