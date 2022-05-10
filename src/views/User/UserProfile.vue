<template>
  <SkeletonGlobalLoading
    :loading="$store.state.userInfo.userDetailLoading"
    v-if="$store.state.userInfo.userDetailLoading"
  ></SkeletonGlobalLoading>
  <div v-else>
    <!-- info -->
    <div class="flex gap-4">
      <ElImage
        class="border-2 border-gray-300 p-1 mr-4 shadow-lg rounded-lg"
        :src="
          $store.state.userInfo.userInfoDetail.profile.avatarUrl +
          '?param=188y188'
        "
      />

      <div class="flex-1">
        <div class="flex items-center">
          <h3 class="text-2xl">
            {{ $store.state.userInfo.userInfoDetail.profile.nickname }}
          </h3>
          <i
            class="iconfont text-4xl linearGradient"
            :class="[
              `icon-level-${$store.state.userInfo.userInfoDetail?.level}`,
            ]"
          ></i>
          <i :class="[gender, 'iconfont']"></i>
        </div>
        <el-divider />
        <ul class="flex gap-4">
          <li>
            <div class="text-3xl">
              {{ $store.state.userInfo.userInfoDetail.profile.eventCount }}
            </div>
            <div class="text-xs text-gray-400">動態</div>
          </li>
          <li>
            <div class="text-3xl">
              {{ $store.state.userInfo.userInfoDetail.profile.follows }}
            </div>
            <div class="text-xs text-gray-400">關注</div>
          </li>
          <li>
            <div class="text-3xl">
              {{ $store.state.userInfo.userInfoDetail.profile.followeds }}
            </div>
            <div class="text-xs text-gray-400">粉絲</div>
          </li>
        </ul>
      </div>
    </div>

    <!-- songs -->
    <div>
      <PlaySongsButton :songs="$store.state.userInfo.userInfoRecord" />
      <div class="mt-4 flex items-center justify-between p-4">
        <div>
          听歌排行
          <span class="text-sm text-gray-400"
            >（累积听歌{{
              $store.state.userInfo.userInfoDetail?.listenSongs
            }}首）</span
          >
        </div>
        <div>
          <ElButton
            @click="onChageRecordMode(1)"
            type="text"
            :style="isActiveCurMode(1)"
            >最近一周</ElButton
          >
          <span class="text-sm text-gray-400 px-2">|</span>
          <ElButton
            @click="onChageRecordMode(0)"
            :style="isActiveCurMode(0)"
            type="text"
            >所有时间</ElButton
          >
        </div>
      </div>
      <SongList :datas="$store.state.userInfo.userInfoRecord" />
    </div>
    <!-- playlist -->
    <UserPlaylist :datas="hasNotSubscribed" :len="hasNotSubscribed.length">
      <template #title> 我创建的歌单 </template>
    </UserPlaylist>
    <UserPlaylist :datas="hasSubscribed" :len="hasSubscribed.length">
      <template #title> 我收藏的歌单 </template>
    </UserPlaylist>
  </div>
</template>
<script setup>
import Types from "@/store/types";
import { computed, onBeforeMount, ref, watch } from "vue-demi";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

//components
import SongList from "@/components/songList/SongList.vue";
import PlaySongsButton from "@/components/button/PlaySongsButton.vue";
import SkeletonGlobalLoading from "@/components/Skeleton/SkeletonGlobalLoading.vue";
import UserPlaylist from "./chlid/UserPlaylist.vue";

const store = useStore();
const route = useRoute();
const recordMode = ref(1);
//歌單
const hasSubscribed = computed(() =>
  store.state.userInfo.userPlaylist.playlist.filter((v) => v.subscribed)
);
const hasNotSubscribed = computed(() =>
  store.state.userInfo.userPlaylist.playlist.filter((v) => !v.subscribed)
);

const isActiveCurMode = (type) =>
  recordMode.value === type && { color: "#000" };
const onChageRecordMode = (type) => (recordMode.value = type);

//性別判斷
const gender = computed(() => {
  let sex = store.state.userInfo.userInfoDetail?.profile?.gender;
  switch (sex) {
    case 1:
      return "icon-sexm text-blue-500";
    case 2:
      return "icon-sexw text-red-500";
    default:
      return "icon-ico-sex text-purple-500";
  }
});

onBeforeMount(() => {
  store.dispatch(Types.FETCH_USER_DETAIL, {
    uid: route.params.userId,
  });
  store.dispatch(Types.FETCH_USER_RECORD, {
    uid: route.params.userId,
    type: recordMode.value,
  });
  store.dispatch(Types.FETCH_USER_PLAYLIST, {
    uid: route.params.userId,
    ...store.state.userInfo.userPlaylistQueryInfo,
    timeStamp: Date.now(),
  });
});

//監聽 record mode 變動
watch(recordMode, (curRecordMode) => {
  store.dispatch(Types.FETCH_USER_RECORD, {
    uid: route.params.userId,
    type: curRecordMode,
  });
});
</script>
<style lang="scss" scoped>
.iconfont {
  cursor: unset;
}

.linearGradient {
  color: red;
  text-shadow: 0px 5px 5px #4b4b4b;
  margin: 0 1rem;
}
</style>
