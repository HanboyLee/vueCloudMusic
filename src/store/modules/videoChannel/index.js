import * as Api from "../../../services/api/video";

import Types from "@/store/types";

const state = {
  categoryTags: [],
  groupTags: [],
  groupVideoData: {},
  videoDetail: {},
  groupQueryInfo: {
    id: 58100,
    offset: 0,
  },
  groupLoading: false,
  detailLoading: false,
};

const getters = {};

const mutations = {
  [Types.SET_VIDEO_CATEGORY_TAGS](state, payload) {
    state.categoryTags = payload.data;
  },
  [Types.SET_VIDEO_GROUP_TAGS](state, payload) {
    state.groupTags = payload.data;
  },
  [Types.SET_VIDEO_GROUP](state, payload) {
    state.groupVideoData = payload;
  },
  [Types.SET_VIDEO_LOADING](state, payload) {
    state.groupLoading = payload;
  },
  [Types.SET_VIDEO_DETAIL_LOADING](state, payload) {
    state.detailLoading = payload;
  },
  [Types.SET_VIDEO_CURRENT_ID](state, payload) {
    state.groupQueryInfo.offset = 0;
    state.groupQueryInfo.id = payload;
  },
  [Types.SET_VIDEO_GROUP_OFFSET](state, payload) {
    state.groupQueryInfo.offset += payload;
  },
  [Types.SET_VIDEO_DETAIL](state, payload) {
    state.videoDetail = {
      detail: payload.detail.data,
      videoUrl: payload.videoUrl.urls[0],
      relatedVideo: payload.relatedVideo.data,
    };
    state.detailLoading = false;
  },
};

const actions = {
  async [Types.FETCH_VIDEO_INIT]({ commit }) {
    try {
      commit(Types.SET_VIDEO_LOADING, true);
      const [groupTags, categoryTags, groupVideo] = await Promise.all([
        Api.getVideoGroupTags(),
        Api.getVideoCategoryTags(),
        Api.getVideoGroup(state.groupQueryInfo),
      ]);

      console.log(groupTags, categoryTags, groupVideo);
      commit(Types.SET_VIDEO_GROUP_TAGS, groupTags);
      commit(Types.SET_VIDEO_CATEGORY_TAGS, categoryTags);
      commit(Types.SET_VIDEO_GROUP, groupVideo);
      commit(Types.SET_VIDEO_LOADING, false);
    } catch (error) {
      console.log(error, Types.FETCH_VIDEO_INIT);
    }
  },
  async [Types.FETCH_VIDEO_GROUP]({ commit }) {
    try {
      const groupVideo = await Api.getVideoGroup(state.groupQueryInfo);
      commit(Types.SET_VIDEO_GROUP, groupVideo);
    } catch (error) {
      console.log(error, Types.FETCH_VIDEO_INIT);
    }
  },
  async [Types.FETCH_VIDEO_DETAIL]({ commit }, params) {
    try {
      commit(Types.SET_VIDEO_DETAIL_LOADING, true);
      const [detail, videoUrl, relatedVideo] = await Promise.all([
        Api.getVideoDetail(params),
        Api.getVideoURL(params),
        Api.getRelatedAllVideo(params),
      ]);
      console.log(detail, videoUrl, relatedVideo);
      commit(Types.SET_VIDEO_DETAIL, { detail, videoUrl, relatedVideo });
    } catch (error) {
      console.log(error);
    }
  },
};

export const videoChannel = {
  state,
  getters,
  mutations,
  actions,
};
