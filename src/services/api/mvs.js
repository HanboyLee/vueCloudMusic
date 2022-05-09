import request from "../request";

/**
 * @name 獲取MV全部
 * @param {string}area 可選參數 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * @param {string}type 可選參數 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * @param {string}order 可選參數 排序,可选值为上升最快,最热,最新,不填则为上升最快
 * @param {number}limit 可選參數 取出数量 , 默认为 30
 * @param {number}offset 可選參數 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * @description 说明 : 调用此接口 , 可获取全部 mv
 * @example /mv/all?area=港台
 */
export const getMvAll = (params) =>
  request.get("/api/mv/all", {
    params,
  });

/**
 * @name mv地址
 * @param {number}id 必選參數 mv id
 * @param {number}r 可選參數 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
 * @description 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
 * @example /mv/url?id=5436712 /mv/url?id=10896407&r=1080
 */
export const getMVUrl = ({ id }) =>
  request.get("/api/mv/url", {
    params: {
      id,
    },
  });

/**
 * @name 獲取ＭＶ數據
 * @param {number} mvid mv 的 id
 * @description 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 , 其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
 * @example /mv/url?mvid=5436712
 */
export const getMVDetail = ({ mvid }) =>
  request.get("/api/mv/detail", {
    params: {
      mvid,
    },
  });

/**
 * @name 相似mv
 * @param {number} mvid mv id
 * @description 说明 : 调用此接口 , 传入 mvid 可获取相似 mv
 * @example /simi/mv?mvid=5436712
 */
export const getMVRelated = ({ mvid }) =>
  request.get("/api/simi/mv", {
    params: {
      mvid,
    },
  });
