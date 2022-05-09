import request from "../request";
import md5 from "md5";
//手机登录
export const requestLogin = ({ phone, password }) =>
  request.get("/api/login/cellphone", {
    params: {
      phone,
      md5_password: md5(password),
    },
  });

//登出
export const requestLogout = () => request.get("/api/logout", {});

//获取用户详情
/**
 *
 * @param {uid} 用户 id
 * @description 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
 */
export const getUserDetail = ({ uid }) =>
  request.get("/api/user/detail", {
    params: {
      uid,
    },
  });

//获取用户信息 , 歌单，收藏，mv, dj 数量
/**
 *
 * @description 说明 : 登录后调用此接口 , 可以获取用户信息
 */
export const getUserSubcount = () => request.get("/api/user/subcount", {});

/**
 * @name 获取用户歌单
   @param {number }uid 必选参数 : uid : 用户 id
   @param {number }type 可选参数 : type : type=1 时只返回 weekData, type=0 时返回 allData
 * @description 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
 */
export const getUserRecord = ({ uid, type }) =>
  request.get("/api/user/record", {
    params: {
      uid,
      type,
    },
  });

/**
 * @name 获取用户播放记录
   @param {number }uid 必选参数 : uid : 用户 id
   @param {number }limit  返回数量 , 默认为 30
   @param {number }offset  偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @description 说明 : 登录后调用此接口 , 传入用户 id, 可获取用户播放记录
 */
export const getUserPlaylist = ({ uid, limit, offset }) =>
  request.get("/api/user/playlist", {
    params: {
      uid,
      limit,
      offset,
    },
  });
