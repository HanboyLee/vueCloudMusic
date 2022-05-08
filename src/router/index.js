import { createRouter, createWebHistory } from "vue-router";
import { ElMessage } from "element-plus";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("@/views/Error404/Error404Page.vue"),
    },
    {
      path: "/",
      component: () => import("@/views/LayoutCom.vue"),
      name: "home",
      children: [
        {
          path: "",
          name: "發現音樂",
          component: () => import("@/views/Home/Discover.vue"),
          meta: {
            keepAlive: true,
          },
        },
        {
          path: "/singer",
          name: "歌手",
          component: () => import("@/views/Singer/SingerView.vue"),
          meta: {
            keepAlive: true,
          },
        },
        {
          path: "/singer/:singerId",
          name: "歌手詳情",
          component: () => import("@/views/Singer/child/SingerDetail.vue"),
        },
        {
          path: "/songListDetail/:detailId",
          name: "細節列表",
          component: () => import("@/components/songList/AlbumSongList.vue"),
        },

        {
          path: "/topList",
          name: "排行榜",
          component: () => import("@/views/TopList/TopList.vue"),
          meta: {
            keepAlive: true,
          },
        },
        {
          path: "/mvlatest",
          name: "MV",
          component: () => import("@/views/MvLatest/MvLatest.vue"),
          meta: {
            keepAlive: true,
          },
        },
        {
          path: "/mvUrl/:mvId",
          name: "MV_Detail",
          component: () => import("@/components/Video/MVPage.vue"),
        },
        {
          path: "/videoUrl/:videoId",
          name: "Video_Detail",
          component: () => import("@/components/Video/VideoPage.vue"),
        },
        {
          path: "/videoChannel",
          name: "视频",
          component: () => import("@/views/VideoChannel/VideoChannel.vue"),
          meta: {
            keepAlive: true,
          },
          beforeEnter() {
            const sessionStore = JSON.parse(sessionStorage.getItem("vuex"));
            const isToken = !!sessionStore?.userInfo?.token;
            if (isToken) {
              return true;
            } else {
              ElMessage.error({ message: "亲，请先登入，才可访问此页面。" });
              return false;
            }
          },
        },
        {
          path: "/playlist",
          name: "歌单",
          component: () => import("@/views/Playlist/PlayList.vue"),
          meta: {
            keepAlive: false,
          },
        },
        {
          path: "/playlist/:detailId",
          name: "歌單細節列表",
          component: () => import("@/components/songList/PlaylistSongList.vue"),
        },
        {
          path: "/search/:keywords",
          name: "搜尋",
          component: () => import("@/views/Search/SearchPage.vue"),
        },
        {
          path: "/profile/:userId",
          name: "用户页面",
          component: () => import("@/views/User/UserProfile.vue"),
        },
      ],
    },
  ],
  // scrollBehavior(to, from, savedPosition) {
  scrollBehavior() {
    // console.log("scrollBehavior", to, from, savedPosition);
    return { x: 0, y: 0 };
  },
});

export default router;
