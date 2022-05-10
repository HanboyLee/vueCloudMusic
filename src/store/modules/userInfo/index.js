import Types from "@/store/types";
import * as Api from "@/services/api/user";
import { ElMessage } from "element-plus";

const state = {
  token: "",
  profile: {},
  isLoginFaild: false,
  userInfoDetail: {},
  userInfoRecord: [],
  userPlaylist: {},
  userDetailLoading: false,
  userPlaylistQueryInfo: {
    limit: 30,
    offset: 0,
  },
};
const getters = {};
const mutations = {
  [Types.SET_USER_LOGIN](state, payload) {
    state.token = payload.token;
    state.profile = payload.profile;
  },
  [Types.SET_USER_LOGIN_FAILD](state, payload) {
    state.isLoginFaild = payload;
  },
  [Types.SET_USER_CLEAN_PROFILE](state) {
    state.token = "";
    state.profile = "";
  },
  [Types.SET_USER_DETAIL](state, payload) {
    state.userInfoDetail = payload;
  },
  [Types.SET_USER_RECORD](state, payload) {
    state.userInfoRecord = payload;
  },
  [Types.SET_USER_PLAYLIST](state, payload) {
    state.userPlaylist = payload;
  },
  [Types.SET_USER_DETAIL_LOADING](state, payload) {
    state.userDetailLoading = payload;
  },
};

const actions = {
  // 使用者登入
  async [Types.REQUEST_USER_LOGIN]({ commit }, params) {
    try {
      const res = await Api.requestLogin(params);
      commit(Types.SET_USER_LOGIN, res);
    } catch (error) {
      // 登入失敗
      commit(Types.SET_USER_LOGIN_FAILD, true);
      console.log(error, Types.REQUEST_USER_LOGIN);
    }
  },
  // 使用者登出
  async [Types.REQUEST_USER_LOGOUT]({ commit }) {
    try {
      await Api.requestLogout();
      commit(Types.SET_USER_CLEAN_PROFILE);
      ElMessage({ message: "登出成功" });
    } catch (error) {
      console.log(error, Types.REQUEST_USER_LOGOUT);
    }
  },
  async [Types.FETCH_USER_DETAIL]({ commit }, params) {
    try {
      commit(Types.SET_USER_DETAIL_LOADING, true);
      const detail = await Api.getUserDetail(params);
      commit(Types.SET_USER_DETAIL, detail);
      commit(Types.SET_USER_DETAIL_LOADING, false);
    } catch (error) {
      console.log(Types.FETCH_USER_DETAIL, error);
    }

    // commit(Types.SET_USER_DETAIL,res)
  },
  async [Types.FETCH_USER_RECORD]({ commit }, params) {
    try {
      let keywords = { 1: "weekData", 0: "allData" };
      const record = await Api.getUserRecord(params);

      const recordSongs = record[keywords[params.type]].map((v) => v.song);

      commit(Types.SET_USER_RECORD, recordSongs);
    } catch (error) {
      console.log(Types.FETCH_USER_RECORD, error);
    }
  },
  async [Types.FETCH_USER_PLAYLIST]({ commit }, params) {
    try {
      const playlist = await Api.getUserPlaylist(params);
      commit(Types.SET_USER_PLAYLIST, playlist);
    } catch (error) {
      console.log(Types.FETCH_USER_PLAYLIST, error);
    }
  },
};

export const userInfo = {
  state,
  getters,
  mutations,
  actions,
};
