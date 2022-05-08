import * as Api from "../../../services/api/recommend";

import Types from "@/store/types";

const state = {
  banners: [],
  personalized: [],
  newSong: [],
  newMv: [],
  loading: false,
};

const getters = {};

const mutations = {
  [Types.SET_BANNER](state, payload) {
    state.banners = payload.banners;
  },
  [Types.SET_PERSONALIZED](state, payload) {
    state.personalized = payload.result;
  },
  [Types.SET_PERSONALIZED_NEWSONG](state, payload) {
    state.newSong = payload.result;
  },

  [Types.SET_PERSONALIZED_MV](state, payload) {
    state.newMv = payload.result;
  },
  [Types.SET_DISCOVER_LOADING](state, payload) {
    state.loading = payload;
  },
};

const actions = {
  async [Types.FETCH_DISCOVER_ASYNC]({ commit }) {
    try {
      commit(Types.SET_DISCOVER_LOADING, true);
      const [banner, personalized, newSong, newMv] = await Promise.all([
        Api.getBanner(),
        Api.getPersonalized(),
        Api.getNewsong(),
        Api.getPersonalizedMv(),
      ]);

      commit(Types.SET_BANNER, banner);
      commit(Types.SET_PERSONALIZED, personalized);
      commit(Types.SET_PERSONALIZED_NEWSONG, newSong);

      commit(Types.SET_PERSONALIZED_MV, newMv);
      commit(Types.SET_DISCOVER_LOADING, false);
    } catch (error) {
      console.log(error);
    }
  },
};

export const discover = {
  state,
  getters,
  mutations,
  actions,
};
