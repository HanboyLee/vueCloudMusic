import request from "../request";

//熱門歌單分類（tag）
export const getPlaylistHot = () => request.get("/api/playlist/hot", {});

//歌單分類（tag）
export const getPlaylistCatlist = () =>
  request.get("/api/playlist/catlist", {});

// 歌單
export const getPlaylists = ({ order, cat, limit, offset }) =>
  request.get("/api/top/playlist", {
    params: {
      order,
      cat,
      limit,
      offset,
    },
  });

// 獲取歌單詳情
export const getPlayListDetail = ({ id }) =>
  request.get("/api/playlist/detail", {
    params: {
      id,
    },
  });

// 獲取歌單全部歌曲詳情
export const getPlayListTrackAll = ({ id }) =>
  request.get("/api/playlist/track/all", {
    params: {
      id,
    },
  });

// 獲取推薦歌單
export const getPlayListRelated = ({ id }) =>
  request.get("/api/related/playlist", {
    params: {
      id,
    },
  });
