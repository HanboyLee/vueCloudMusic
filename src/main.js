import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import "./assets/elementVariables.scss";
import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";
import { store } from "./store";
import globalProperties from "./utils/globalPropertiesHelper";
import "@/assets/base.css";

const app = createApp(App);
VXETable.setup({
  keepSource: true,
});
app.use(store);
app.use(VXETable);

app.use(router).use(ElementPlus);
app.use(globalProperties);
app.mount("#app");
