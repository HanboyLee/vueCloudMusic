import * as Api from "../../../services/api/mvs";

import Types from "@/store/types";

const state = {
  mvDetail: {},
  mvUrl: {},
  relatedMV: [],
  loading: false,
};

const getters = {};

const mutations = {
  [Types.SET_MV_DETAIL](state, payload) {
    state.mvDetail = payload.mvDetail;
    state.mvUrl = payload.mvUrl;
    state.relatedMV = payload.relatedMV.mvs;
    state.loading = false;
  },

  [Types.SET_MVDETAIL_LOADING](state, payload) {
    state.loading = payload;
  },
};

const actions = {
  async [Types.FTECH_MV_DETAIL]({ commit }, params) {
    try {
      commit(Types.SET_MVDETAIL_LOADING, true);
      const [mvDetail, mvUrl, relatedMV] = await Promise.all([
        Api.getMVDetail(params),
        Api.getMVUrl(params),
        Api.getMVRelated(params),
      ]);

      commit(Types.SET_MV_DETAIL, { mvDetail, mvUrl, relatedMV });
    } catch (error) {
      console.log(error);
    }
  },
};

export const mvDetail = {
  state,
  getters,
  mutations,
  actions,
};
