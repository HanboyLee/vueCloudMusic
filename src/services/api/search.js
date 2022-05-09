import request from "../request";

/**
 * @name 搜尋
 * @param {string}keywords 必选参数 : keywords : 关键词
 * @param {number}limit 可选参数 返回数量 , 默认为 30
 * @param {number}offset 可选参数 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param {number}type 可选参数 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
 * @description 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接V, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
 * @example  /search?keywords=海阔天空 /cloudsearch?keywords=海阔天空
 */
export const getSearch = ({ type, keywords, limit, offset }) =>
  request.get("/api/cloudsearch", {
    params: {
      type,
      keywords,
      limit,
      offset,
    },
  });

/**
 * @name 热搜列表(简略)
 * @description 说明 : 调用此接口,可获取热门搜索列表
 * @example /search/hot
 */
export const getSearchHotTags = () => request.get("/api/search/hot", {});
