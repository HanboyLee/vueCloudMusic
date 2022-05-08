import * as Api from "../../../services/api/singer";

import Types from "@/store/types";

const state = {
  artists: [],
  navBar: {
    area: [
      {
        id: "-1",
        title: "全部",
      },
      {
        id: "7",
        title: "华语",
      },
      {
        id: "96",
        title: "欧美",
      },
      {
        id: "8",
        title: "日本",
      },
      {
        id: "16",
        title: "韩国",
      },
      {
        id: "0",
        title: "其他",
      },
    ],
    type: [
      { title: "全部", id: "-1" },
      { title: "男歌手", id: "1" },
      { title: "女歌手", id: "2" },
      { title: "乐队组合", id: "3" },
    ],
    initial: [
      { id: "-1", title: "热门" },
      { id: "a", title: "A" },
      { id: "b", title: "B" },
      { id: "c", title: "C" },
      { id: "d", title: "D" },
      { id: "e", title: "E" },
      { id: "f", title: "F" },
      { id: "g", title: "G" },
      { id: "h", title: "H" },
      { id: "i", title: "I" },
      { id: "j", title: "J" },
      { id: "k", title: "K" },
      { id: "l", title: "L" },
      { id: "m", title: "M" },
      { id: "n", title: "N" },
      { id: "o", title: "O" },
      { id: "p", title: "P" },
      { id: "q", title: "Q" },
      { id: "r", title: "R" },
      { id: "s", title: "S" },
      { id: "t", title: "T" },
      { id: "u", title: "U" },
      { id: "v", title: "V" },
      { id: "w", title: "W" },
      { id: "x", title: "X" },
      { id: "y", title: "Y" },
      { id: "z", title: "Z" },
      { id: "#", title: "其他" },
    ],
  },
  queryInfo: {
    area: "-1",
    type: "-1",
    limit: 30,
    offset: 0,
    initial: "-1",
    more: true,
  },
  singerDetail: {},
  albumSongs: {},
  albumSongsLoading: false,
  singerListLoading: false,
};

const getters = {};

const mutations = {
  [Types.SET_SINGER_AREA](state, payload) {
    state.queryInfo.area = payload;
  },

  [Types.SET_SINGER_TYPE](state, payload) {
    state.queryInfo.type = payload;
  },
  [Types.SET_SINGER_INITIAL](state, payload) {
    state.queryInfo.initial = payload;
  },

  [Types.SET_SINGER_LIST_MORE](state, payload) {
    state.queryInfo.more = payload;
  },
  [Types.SET_SINGER_PAGINATION](state, payload) {
    state.queryInfo = Object.assign(state.queryInfo, payload);
  },
  [Types.SET_SINGER_LIST](state, payload) {
    state.artists = payload;
  },
  [Types.SET_SINGER_DETAIL](state, payload) {
    state.singerDetail = payload;
  },
  [Types.SET_SINGER_ALBUM_SONGS](state, payload) {
    state.albumSongs = payload;
    this.commit(Types.IS_LOADING_ALBUM, false);
  },
  [Types.IS_LOADING_ALBUM](state, payload) {
    state.albumSongsLoading = payload;
  },
  [Types.SET_SINGER_LIST_LOADING](state, payload) {
    state.singerListLoading = payload;
  },
};

const actions = {
  async [Types.SINGER_LIST_ASYNC]({ commit }, params) {
    try {
      commit(Types.SET_SINGER_LIST_LOADING, true);
      const datas = await Api.getSingerList(params);
      commit(Types.SET_SINGER_LIST_MORE, datas.more);
      commit(Types.SET_SINGER_LIST, datas.artists);
      commit(Types.SET_SINGER_LIST_LOADING, false);
    } catch (error) {
      console.log(error, Types.SINGER_LIST_ASYNC);
    }
  },
  async [Types.SINGER_DETAIL_ASYNC]({ commit }, params) {
    try {
      const datas = await Api.getSignerDetail(params);
      commit(Types.SET_SINGER_DETAIL, datas);
    } catch (error) {
      console.log(error, Types.SINGER_DETAIL_ASYNC);
    }
  },
  async [Types.SINGER_ALBUM_SONGS_ASYNC]({ commit }, params) {
    try {
      commit(Types.IS_LOADING_ALBUM, true);
      const datas = await Api.getSingerAlbumSongs(params);
      commit(Types.SET_SINGER_ALBUM_SONGS, datas);
    } catch (error) {
      console.log(error, Types.SINGER_ALBUM_SONGS_ASYNC);
    }
  },
};

export const singer = {
  state,
  getters,
  mutations,
  actions,
};
