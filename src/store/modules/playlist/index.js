import * as Api from "../../../services/api/playlist";

import Types from "@/store/types";

const state = {
  playlists: [],
  catlistTag: {},
  hotTag: [],
  queryInfo: {
    limit: 40,
    offset: 0,
    cat: "全部",
    order: "hot",
  },
  loading: false,
  playlistDetail: {},
  playListTrackAllSongs: [],
  playListRelated: [],
};

const getters = {};

const mutations = {
  [Types.PUSH_SONGS](state, payload) {
    if (Array.isArray(payload)) {
      state.songs = payload;
    } else {
      state.songs.push(payload);
    }
  },
  [Types.SET_PLAYLISTS_LOADING](state, payload) {
    state.loading = payload;
  },
  [Types.SET_PLAYLISTS](state, payload) {
    state.playlists = payload;
  },
  [Types.SET_All_TAG](state, payload) {
    state.catlistTag = payload;
  },
  [Types.SET_HOT_TAG](state, payload) {
    state.hotTag = payload.tags;
  },
  [Types.SELECTED_CURRENT_TAG](state, payload) {
    state.queryInfo.cat = payload;
  },
  [Types.SET_PLAYLIST_PAGINATION](state, payload) {
    state.queryInfo.offset = payload;
  },
  [Types.SET_PLAYLISTS_DETAIL](state, payload) {
    state.playlistDetail = payload.detail;
    state.playListTrackAllSongs = payload.trackAll;
    state.playListRelated = payload.playListRelated;
  },
};

const actions = {
  //單曲加入
  async [Types.FETCH_PLAYLIST_INITIAL_ASYNC]({ commit, state }) {
    commit(Types.SET_PLAYLISTS_LOADING, true);
    const [playlistCatlist, playlistHot, playlists] = await Promise.all([
      Api.getPlaylistCatlist(),
      Api.getPlaylistHot(),
      Api.getPlaylists(state.queryInfo),
    ]);
    commit(Types.SET_All_TAG, playlistCatlist);
    commit(Types.SET_HOT_TAG, playlistHot);
    commit(Types.SET_PLAYLISTS, playlists);
    commit(Types.SET_PLAYLISTS_LOADING, false);
  },
  async [Types.FETCH_UPDATE_PLAYLIST_ASYNC]({ commit }, params) {
    const playlists = await Api.getPlaylists(params);
    commit(Types.SET_PLAYLISTS, playlists);
  },
  async [Types.FETCH_PLAYLIST_DETAIL_ASYNC]({ commit }, params) {
    commit(Types.SET_PLAYLISTS_LOADING, true);
    const [detail, trackAll, related] = await Promise.all([
      Api.getPlayListDetail(params),
      Api.getPlayListTrackAll(params),
      Api.getPlayListRelated(params),
    ]);
    commit(Types.SET_PLAYLISTS_DETAIL, {
      detail: detail.playlist,
      trackAll: trackAll.songs,
      playListRelated: related.playlists,
    });
    commit(Types.SET_PLAYLISTS_LOADING, false);
  },
};

export const playlist = {
  state,
  getters,
  mutations,
  actions,
};
