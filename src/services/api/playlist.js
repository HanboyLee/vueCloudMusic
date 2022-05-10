import request from "../request";

/**
 * @name 熱門歌單分類
 * @description 说明 : 调用此接口,可获取歌单分类,包含 category 信息
 * @example /playlist/hot
 */
export const getPlaylistHot = () => request.get("/api/playlist/hot", {});

/**
 * @name 歌單分類
 * @description 说明 : 调用此接口,可获取歌单分类,包含 category 信息
 * @example /playlist/catlist
 */
export const getPlaylistCatlist = () =>
  request.get("/api/playlist/catlist", {});

/**
 * @name 歌单(网友精选碟)
 * @param {string}order 可選參數 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * @param {string}cat 可選參數 tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * @param {number}limit 可選參數 取出歌单数量 , 默认为 50
 * @param {number}offset 可選參數 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 * @description 说明 : 调用此接口 , 可获取网友精选碟歌单
 * @example /top/playlist?limit=10&order=new
 */
export const getPlaylists = ({ order, cat, limit, offset }) =>
  request.get("/api/top/playlist", {
    params: {
      order,
      cat,
      limit,
      offset,
    },
  });

/**
 * @name 获取歌单详情
 * @param {number}id 必选参数 歌單id
 * @param {number}s 可选参数 歌单最近的 s 个收藏者,默认为 8
 * @description 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
 * @example /playlist/detail?id=24381616
 */
export const getPlayListDetail = ({ id, timeStamp }) =>
  request.get("/api/playlist/detail", {
    params: {
      id,
      timeStamp,
    },
  });

/**
 * @name 获取歌单所有歌曲
 * @param {number}id 必选参数 歌单 id
 * @param {number}limit 可选参数 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
 * @param {number}offset 可选参数 默认值为0
 * @description 说明 : 由于网易云接口限制，歌单详情只会提供 10 首歌，通过调用此接口，传入对应的歌单id，即可获得对应的所有歌曲
 * @example  /playlist/track/all?id=24381616&limit=10&offset=1
 */
export const getPlayListTrackAll = ({ id }) =>
  request.get("/api/playlist/track/all", {
    params: {
      id,
    },
  });

/**
 * @name 相关歌单推荐
 * @param {number}id 必选参数  歌单 id
 * @description 说明 : 调用此接口,传入歌单 id 可获取相关歌单(对应页面 https://music.163.com/#/playlist?id=1)
 * @example /related/playlist?id=1
 */
export const getPlayListRelated = ({ id }) =>
  request.get("/api/related/playlist", {
    params: {
      id,
    },
  });

/**
 * @name 收藏歌單
 * @param {number}id 必选参数  歌单 id
 * @param {number}t 必选参数  类型,1:收藏,2:取消
 * @description 说明 : 调用此接口 , 传入类型和歌单 id 可收藏歌单或者取消收藏歌单
 * @example /playlist/subscribe?t=1&id=106697785 /playlist/subscribe?t=2&id=106697785
 */
export const updatePlayListSubscribe = ({ id, t = 1 }) =>
  request.get("/api/playlist/subscribe", {
    params: {
      id,
      t,
      timeStamp: Date.now(),
    },
  });
