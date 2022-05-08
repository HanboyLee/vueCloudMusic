import { createStore, createLogger } from "vuex";
import { discover } from "./modules/discover";
import { singer } from "./modules/singer";
import { player } from "./modules/player";
import { mvAll } from "./modules/mvs";
import { mvDetail } from "./modules/mvDetail";
import { comment } from "./modules/comment";
import { topList } from "./modules/topList";
import { playlist } from "./modules/playlist";
import { videoChannel } from "./modules/videoChannel";
import { search } from "./modules/search";
import { userInfo } from "./modules/userInfo";
import createPersistedState from "vuex-persistedstate";

//數據持久話
const persisted = createPersistedState({
  storage: window.sessionStorage,
  paths: ["player", "userInfo"],
});
export const store = createStore({
  modules: {
    discover,
    singer,
    player,
    mvAll,
    mvDetail,
    comment,
    topList,
    playlist,
    videoChannel,
    search,
    userInfo,
  },
  plugins: [createLogger(), persisted],
});
