import Types from "@/store/types";
import * as Api from "@/services/api/topList";
const state = {
  topList: [],
  topListDetail: {},
  loading: false,
};
const getters = {
  [Types.FILTER_HAS_TOPLISTTYPE](state) {
    return state.topList.filter((item) => item.ToplistType);
  },
  [Types.FILTER_NOT_HAS_TOPLISTTYPE](state) {
    return state.topList.filter((item) => !item.ToplistType);
  },
};

const mutations = {
  [Types.SET_TOPLIST_NAVBAR](state, payload) {
    this.commit(Types.SET_TOPLIST_LOADING, false);
    state.topList = payload;
  },
  [Types.SET_TOPLIST_PLAYLIST_DETAIL](state, payload) {
    state.topListDetail = payload;
  },
  [Types.SET_TOPLIST_LOADING](state, payload) {
    state.loading = payload;
  },
};

const actions = {
  async [Types.FETCH_TOPLIST_NAVBAR]({ commit, dispatch }) {
    commit(Types.SET_TOPLIST_LOADING, true);
    const { list } = await Api.getTopListNavBar();
    const { playlist } = await Api.getTopListPlaylistDetail({ id: list[0].id });
    dispatch(Types.FETCH_COMMENT_PLAYLIST, { id: list[0].id });
    commit(Types.SET_TOPLIST_NAVBAR, list);
    commit(Types.SET_TOPLIST_PLAYLIST_DETAIL, playlist);
  },
  async [Types.FETCH_TOPLIST_PLAYLIST_DETAIL]({ commit }, params) {
    const { playlist } = await Api.getTopListPlaylistDetail(params);
    console.log(playlist, "playlist");
    commit(Types.SET_TOPLIST_PLAYLIST_DETAIL, playlist);
  },
};

export const topList = {
  state,
  getters,
  mutations,
  actions,
};
