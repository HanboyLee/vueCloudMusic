import request from "../request";

//獲取MV全部
export const getMvAll = (params) =>
  request.get("/api/mv/all", {
    params,
  });

//獲取MV Url
export const getMVUrl = ({ id }) =>
  request.get("/api/mv/url", {
    params: {
      id,
    },
  });

//獲取ＭＶ數據
export const getMVDetail = ({ mvid }) =>
  request.get("/api/mv/detail", {
    params: {
      mvid,
    },
  });

//獲取ＭＶ數據
export const getMVRelated = ({ mvid }) =>
  request.get("/api/simi/mv", {
    params: {
      mvid,
    },
  });
