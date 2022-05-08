import request from "../request";

//獲取榜單標題列表
export const getTopListNavBar = () => request.get("/api/toplist/detail", {});

//獲取歌單詳情
export const getTopListPlaylistDetail = ({ id }) =>
  request.get("/api/playlist/detail", {
    params: {
      id,
    },
  });
