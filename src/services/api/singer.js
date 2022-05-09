import request from "../request";

/**
 * @歌手分类列表
 * @param {*} param0
 * @description 说明 : 调用此接口,可获取歌手分类列表
 */
export const getSingerList = async ({
  type,
  area,
  limit,
  offset,
  initial = -1,
}) =>
  request.get("/api/artist/list", {
    params: { type, area, limit, offset, initial },
  });

//歌手热门 50 首歌曲
export const getTopsong = ({ id }) =>
  request.get("/api/artist/top/song", { params: { id } });
//歌手专辑
export const getSignerAlbums = ({ id, offset }) =>
  request.get("/api/artist/album", { params: { id, offset } });
//歌手详情
export const getSignerDetail = ({ id }) =>
  request.get("/api/artist/detail", { params: { id } });
//歌手描述
export const getSignerDesc = ({ id }) =>
  request.get("/api/artist/desc", {
    params: {
      id,
    },
  });
//歌手ＭＶ
export const getSingerMv = ({ id, offset, limit }) =>
  request.get("/api/artist/mv", {
    params: {
      id,
      offset,
      limit,
    },
  });
//获取相似歌手
export const getSingerSimi = ({ id }) =>
  request.get("/api/simi/artist", {
    params: {
      id,
    },
  });

//獲取專輯內容
export const getSingerAlbumSongs = ({ id }) =>
  request.get("/api/album", {
    params: {
      id,
    },
  });
