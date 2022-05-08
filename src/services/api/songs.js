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
