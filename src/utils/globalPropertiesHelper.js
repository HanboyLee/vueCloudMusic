import * as utils from "./utils.js";
import moment from "moment";
import "moment/dist/locale/zh-cn";

const globalProperties = (app) => {
  moment.locale();
  app.config.globalProperties.$utils = utils;
  app.config.globalProperties.$moment = moment;
  app.provide("utils", app.config.globalProperties.$utils);
};
export default globalProperties;
