import request from "../request";

//獲取歌曲URL
export const getSongUrl = ({ id }) =>
  request.get("/api/song/url", {
    params: {
      id,
      realIP: "116.25.146.177",
    },
  });
//獲取歌詞
export const getSongLrc = ({ id }) =>
  request.get("/api/lyric", {
    params: {
      id,
      realIP: "116.25.146.177",
    },
  });

/**
 *
 * @param {number}id 必选参数 歌曲 id
 * @param {number}sourceid 必选参数 歌单或专辑 id
 * @param {number}time 可选参数  歌曲播放时间,单位为秒
 * @description 说明 : 调用此接口 , 传入音乐 id, 来源 id，歌曲时间 time，更新听歌排行数据
 * @example /scrobble?id=518066366&sourceid=36780169&time=291
 */
export const upDateSourceid = ({ id, sourceid, time }) =>
  request.get("/api/scrobble", {
    params: {
      id,
      sourceid,
      time,
    },
  });
