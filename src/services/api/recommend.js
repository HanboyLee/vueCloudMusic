import request from "../request";

/**
 * Discover
 */
//獲取輪播圖
export const getBanner = () => request.get("/api/banner", {});
//推荐歌单
export const getPersonalized = () =>
  request.get("/api/personalized", { params: { limit: 18 } });
//推荐新音乐
export const getNewsong = () =>
  request.get("/api/personalized/newsong", { params: { limit: 18 } });
//獨家放送
export const getPrivatecontent = () =>
  request.get("/api/personalized/privatecontent", {});
//推薦ＭＶ
export const getPersonalizedMv = () => request.get("/api/personalized/mv", {});
