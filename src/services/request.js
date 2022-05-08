import axios from "axios";
import { API_TIMEOUT, API_URL } from "../configs/config";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
const instance = () => {
  let createInstance = axios.create({
    url: API_URL,
    timeout: API_TIMEOUT,
    withCredentials: true,
    responseType: "json",
    params: {
      // realIP: "211.161.244.70",
      // realIP: "116.25.146.177",
    },
  });

  createInstance.interceptors.response.use(handleResponse, handleError);
  createInstance.interceptors.request.use(handleRequest, handleError);

  return createInstance;
};

//Response
const handleResponse = (res) => {
  try {
    // console.log(res, "handleResponse", 23);
    if (res.data.code !== 200) {
      throw new Error(res?.data?.message);
    }
    nprogress.done();
    return res.data;
  } catch (error) {
    // message.error(error.message || "加載資料失敗", 2);
    nprogress.done();
  }
};
//Request
const handleRequest = (config) => {
  const storage = JSON.parse(sessionStorage.getItem("vuex"));
  if (storage?.userInfo?.token) {
    config.params["token"] = storage.userInfo.token;
  }
  // console.log(config, "handleRequest");
  nprogress.start();

  return config;
};

//Error
const handleError = (error) => {
  const { response, msg } = error;
  // message.error(response.data.msg);
  nprogress.done();
  Promise.reject(response ? new Error(response.data.message || msg) : error);
};

const request = instance();
export default request;
