import Types from "@/store/types";
import * as Api from "@/services/api/comment";
const state = {
  commentMv: {
    datas: {},
    queryInfo: {
      limit: 20,
      offset: 0,
      timestamp: 0,
    },
    loading: false,
  },
  commentPlaylist: {
    datas: {},
    queryInfo: {
      limit: 20,
      offset: 0,
      timestamp: 0,
    },
    loading: false,
  },
  commentVideo: {
    datas: {},
    queryInfo: {
      limit: 20,
      offset: 0,
      timestamp: 0,
    },
    loading: false,
  },
};
const getters = {};

const mutations = {
  [Types.SET_COMMENT_MV](state, payload) {
    state.commentMv.datas = payload;
  },
  [Types.SET_MV_COMMENT_PAGINATION](state, payload) {
    state.commentMv.queryInfo.offset = payload;
  },
  [Types.SET_COMMENT_PLAYLIST](state, payload) {
    state.commentPlaylist.datas = payload;
  },
  [Types.SET_PLAYLIST_COMMENT_PAGINATION](state, payload) {
    state.commentPlaylist.queryInfo.offset = payload;
  },
  [Types.SET_COMMENT_VIDEO](state, payload) {
    state.commentVideo.datas = payload;
  },
  [Types.SET_COMMENT_VIDEO_PAGINATION](state, payload) {
    state.commentVideo.queryInfo.offset = payload;
  },
  [Types.RESET_COMMNET](state) {
    state.commentPlaylist.queryInfo = {
      limit: 20,
      offset: 0,
    };
  },
  [Types.SET_COMMENT_VIDEO_REFRESH](state, payload) {
    state.commentVideo.queryInfo.timestamp = payload.comment.time;
  },
  [Types.SET_COMMENT_MV_REFRESH](state, payload) {
    state.commentMv.queryInfo.timestamp = payload.comment.time;
  },
  [Types.SET_COMMENT_PLAYLIST_REFRESH](state, payload) {
    state.commentPlaylist.queryInfo.timestamp = payload.comment.time;
  },
};

const actions = {
  async [Types.FETCH_COMMENT_MV]({ commit }, params) {
    try {
      const datas = await Api.getCommentMV(params);
      commit(Types.SET_COMMENT_MV, datas);
    } catch (error) {
      console.log(Types.SET_COMMENT_MV, error);
    }
  },
  async [Types.FETCH_COMMENT_PLAYLIST]({ commit }, params) {
    try {
      const datas = await Api.getCommentPlaylist(params);
      commit(Types.SET_COMMENT_PLAYLIST, datas);
    } catch (error) {
      console.log(Types.SET_COMMENT_PLAYLIST, error);
    }
  },
  async [Types.FETCH_COMMENT_VIDEO]({ commit }, params) {
    try {
      const datas = await Api.getCommentVideo(params);
      commit(Types.SET_COMMENT_VIDEO, datas);
    } catch (error) {
      console.log(Types.SET_COMMENT_VIDEO, error);
    }
  },
  async [Types.FETCH_COMMENT_CURRENT]({ commit }, { refreshType, ...params }) {
    try {
      const datas = await Api.getCommentCurrent(params);
      console.log(datas, "datas", params);
      commit(refreshType, datas);
    } catch (error) {
      console.log(Types.FETCH_COMMENT_CURRENT, error);
    }
  },
};

export const comment = {
  state,
  getters,
  mutations,
  actions,
};
