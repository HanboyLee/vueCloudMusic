import request from "../request";

//获取视频标签/分类下的视频
export const getVideoGroup = ({ id, offset }) => {
  return request.get("/api/video/group", {
    params: {
      id,
      offset,
    },
  });
};

//获取视频标签列表
export const getVideoGroupTags = () => request.get("/api/video/group/list", {});

//获取视频分类列表
export const getVideoCategoryTags = () =>
  request.get("/api/video/category/list");

//视频详情
export const getVideoDetail = ({ id }) =>
  request.get("/api/video/detail", {
    params: {
      id,
    },
  });

//相關视频
export const getRelatedAllVideo = ({ id }) =>
  request.get("/api/related/allvideo", {
    params: {
      id,
    },
  });

//视频地址
export const getVideoURL = ({ id }) =>
  request.get("/api/video/url", {
    params: {
      id,
    },
  });
