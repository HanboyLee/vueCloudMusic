import request from "../request";

/**
 * @name banner
 * @param {number}type 资源类型,对应以下类型,默认为 0 即 PC
 * 0: pc
 * 1: android
 * 2: iphone
 * 3: ipad
 * @description 说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
 * @example /banner, /banner?type=2
 */
export const getBanner = () => request.get("/api/banner", {});

/**
 * @name 推荐歌单
 * @description 说明 : 调用此接口 , 可获取推荐歌单
 * @example /personalized
 */
export const getPersonalized = () =>
  request.get("/api/personalized", { params: { limit: 18 } });

/**
 * @name 推荐新音乐
 * @param {number}limit 可选参数 取出数量 , 默认为 10 (不支持 offset)
 * @description 说明 : 调用此接口 , 可获取推荐新音乐
 * @example /personalized/newsong
 */
export const getNewsong = () =>
  request.get("/api/personalized/newsong", { params: { limit: 18 } });

/**
 * @name 独家放送(入口列表)
 * @description 说明 : 调用此接口 , 可获取独家放送
 * @example /personalized/privatecontent
 */
export const getPrivatecontent = () =>
  request.get("/api/personalized/privatecontent", {});

/**
 * @name 推荐mv
 * @description 说明 : 调用此接口 , 可获取推荐 mv
 * @example /personalized/mv
 */
export const getPersonalizedMv = () => request.get("/api/personalized/mv", {});
