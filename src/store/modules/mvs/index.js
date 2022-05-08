import * as Api from "../../../services/api/mvs";
import Types from "@/store/types";

const state = {
  mvDatas: [],
  queryInfo: {
    area: "全部",
    order: "上升最快",
    type: "全部",
    offset: 0,
    limit: 30,
  },
  loading: false,
  mvCount: 0,
};

const getters = {};

const mutations = {
  [Types.SET_MVALL_AREA](state, payload) {
    state.queryInfo.area = payload;
  },
  [Types.SET_MVALL_ORDER](state, payload) {
    state.queryInfo.order = payload;
  },
  [Types.SET_MVALL_TYPE](state, payload) {
    state.queryInfo.type = payload;
  },
  [Types.SET_MV_ALL](state, payload) {
    console.log(payload);
    if (payload.count) {
      state.mvCount = payload.count;
    }
    state.mvDatas = payload;
    this.commit(Types.SET_MVALL_LOADING, false);
  },
  [Types.SET_MVALL_OFFSET](state, payload) {
    state.queryInfo.offset = payload;
  },
  [Types.SET_MVALL_LOADING](state, payload) {
    state.loading = payload;
  },
};

const actions = {
  async [Types.FETCH_MV_ALL]({ commit }, params) {
    try {
      commit(Types.SET_MVALL_LOADING, true);
      const datas = await Api.getMvAll(params);
      commit(Types.SET_MV_ALL, datas);
    } catch (error) {
      console.log(error);
    }
  },
};

export const mvAll = {
  state,
  getters,
  mutations,
  actions,
};
