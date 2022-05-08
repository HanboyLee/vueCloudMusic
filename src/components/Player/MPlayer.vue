<template>
  <audio
    ref="instance"
    preload="none"
    @progress="onProgress"
    @playing="audioReady"
    @error="audioError"
    @timeupdate="updateTime"
    @ended="audioEnd"
    @pause="audioPaused"
    :muted="isMuted"
  >
    <source :src="currentSong.url" type="audio/mp3" />
  </audio>
  <div class="flex items-center h-full justify-center">
    <div class="playControl">
      <i class="iconfont icon-left" @click="onPrevSong"></i>
      <VideoPause @click="onPause" v-if="isPlayControl" class="icon pause" />
      <VideoPlay @click="onPlay" v-else class="icon play" />
      <i class="iconfont icon-right1" @click="onNextSong"></i>
    </div>
    <!-- artist -->
    <ElImage :src="currentSong.cover" class="artist" />

    <div class="progressBar">
      <div class="font-serif flex justify-between items-center">
        <div class="flex items-center overflow-hidden">
          <div
            class="text-xl pr-4 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {{ currentSong.name }}
          </div>
          <div
            class="overflow-hidden whitespace-nowrap text-ellipsis w-24 text-gray-500"
          >
            {{ currentSong.artist }}
          </div>
        </div>
        <div class="w-32">
          {{ $utils.formatTime(currentTime) }} /
          {{ $utils.formatTime(durationTime) }}
        </div>
      </div>
      <!-- 進度條 -->
      <MProgress
        :percent="percent"
        :durationTime="durationTime"
        :currentTime="currentTime"
        @changeProgress="changeProgress"
      />
    </div>
    <div class="controlBox">
      <div class="soundControl">
        <i @click="onMuted" v-if="isMuted" class="iconfont icon-Sound_"></i>
        <i @click="onMuted" v-else class="iconfont icon-Sound_1"></i>
        <Slider
          show-tooltip="drag"
          :step="-1"
          class="slider"
          :min="0"
          :max="1"
          v-model="volume"
          :format="coverRate"
        />
      </div>

      <div class="flex">
        <!-- modeType -->
        <div>
          <i @click="onModeType" :class="classIcon" class="iconfont"></i>
        </div>
        <!-- 列表 -->
        <div class="relative" @click="onSonglistChange">
          <i
            class="iconfont icon-playlist"
            :style="isShowPlaylist && { color: 'red' }"
          ></i>
        </div>
        <!-- 歌詞 -->
        <div>
          <i
            class="iconfont icon-lyric"
            :style="isShowLyric && { color: 'red' }"
            @click="onShowLyricChange"
          ></i>
        </div>
      </div>
    </div>
  </div>
  <!--Song lists -->
  <Transition name="fade">
    <MPlaylist
      :instance="instance"
      @onCloseList="onCloseList"
      v-if="isShowPlaylist"
      v-model="currentIndex"
      v-model:isShowPlaylist="isShowPlaylist"
    />
  </Transition>

  <!--Song lyric -->
  <Transition name="fadeLyric">
    <MPlayerLyric
      :currentLyric="currentLyric"
      :currentTime="currentTime"
      :isShowLyric="isShowLyric"
    />
  </Transition>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch, inject } from "vue-demi";
import { useStore } from "vuex";
import Slider from "@vueform/slider";
import { VideoPlay, VideoPause } from "@element-plus/icons-vue";
import { onBeforeRouteUpdate } from "vue-router";

//types
import Types from "@/store/types";
//apis
import { getSongLrc } from "@/services/api/songs";
//components
import MPlaylist from "./MPlaylist.vue";
import MPlayerLyric from "./MPlayerLyric.vue";
import MProgress from "./MProgress.vue";

//utils
const utils = inject("utils");
//state
const store = useStore();
const instance = ref(null);
const isPlayControl = ref(false); //播放控制
const isMuted = ref(false);
const durationTime = ref(0);
const currentTime = ref(0);
const percent = ref(0);
const progressState = ref(false);
const volume = ref(0.7);
const modeType = ref(0); //切換音樂模式
const currentSong = ref({});
const currentIndex = ref(0);
const isShowPlaylist = ref(false);
const isShowLyric = ref(false);
const currentLyric = ref(null);

const classIcon = computed(() =>
  modeType.value === 0
    ? "icon-icon_playall"
    : modeType.value === 1
    ? "icon-icon_playone"
    : "icon-random"
);

const initAudio = () => {
  if (!store.state.player.songs.length) {
    currentSong.value = {};
    durationTime.value = 0;
    isPlayControl.value = false;
    currentLyric.value = null;
    instance.value.load();
    return;
  }
  const song = store.state.player.songs[currentIndex.value];
  currentSong.value = song;
  instance.value.load();
};
//初始化
onMounted(() => {
  try {
    initAudio();
  } catch (error) {
    console.log(error, "onMounted");
  }
});
// 當進入視頻模式播放將停止
onBeforeRouteUpdate((to, form, next) => {
  let whiteList = ["MV_Detail", "Video_Detail"];
  if (whiteList.includes(to.name)) {
    onPause();
  }
  next();
});
//播放
const onPlay = async () => {
  if (!store.state.player.songs.length) {
    isPlayControl.value = false;
    return;
  }
  isPlayControl.value = true;
  instance.value.play();
};

//暫停
const onPause = async () => {
  isPlayControl.value = false;
  instance.value.pause();
};

//重新加載後播放
const onReloadSong = () => {
  instance.value.currentTime = 0;
  const promise = instance.value.play();
  if (promise !== undefined) {
    promise
      .then(() => {
        setTimeout(() => {
          onPlay();
        }, 1000);
      })
      .catch(() => {
        // instance.value.load();
        onReloadSong();
      });
  }
};
//清除歌詞
const clearLyric = () => {
  if (currentLyric.value) {
    currentLyric.value = null;
  }
};
//上一首
const onPrevSong = async () => {
  if (currentIndex.value <= 0) {
    const listLen = store.state.player.songs.length - 1;
    return (currentIndex.value = listLen);
  }
  currentIndex.value -= 1;
};

//下一首
const onNextSong = async () => {
  const listLen = store.state.player.songs.length - 1;
  if (currentIndex.value === listLen) {
    currentIndex.value = 0;
    return;
  }
  currentIndex.value += 1;
};
//監聽歌曲索引
watch(
  () => currentIndex.value,
  (cur) => {
    console.log(cur, "監聽歌曲索引");
    const song = store.state.player.songs[cur];
    instance.value.src = song.url;
    currentSong.value = song;
  }
);

//列表開關
const onSonglistChange = () => (isShowPlaylist.value = !isShowPlaylist.value);
const onShowLyricChange = () => (isShowLyric.value = !isShowLyric.value);
const onCloseList = () => (isShowPlaylist.value = false);

//切換播放模式
const onModeType = async () => {
  await nextTick(() => {
    if (modeType.value === 2) {
      return (modeType.value = 0);
    }
    modeType.value = modeType.value + 1;
  });
};

//音量轉換
const coverRate = (v) => parseInt(v * 100);

//靜音變動
const onMuted = async () => {
  isMuted.value = !isMuted.value;
  await nextTick(() => {
    instance.value.muted = isMuted.value;
    instance.value.volume = isMuted.value ? 0 : volume.value;
    if (!isMuted.value) {
      volume.value = 0.5;
    } else {
      volume.value = 0;
    }
  });
};

//監聽歌曲新增或刪除
watch(
  () => store.state.player.songs,
  async (songs) => {
    const curLen = songs.length - 1;
    if (curLen === -1) {
      initAudio();
    } else {
      instance.value.src = songs[curLen].url;
      currentSong.value = songs[curLen];
    }
  },
  { deep: true }
);

//監聽換歌
watch(
  () => currentSong.value,
  (cur) => {
    clearLyric();
    //get current song
    const isExistSong = Object.keys(cur).length;
    if (isExistSong) {
      const curIndex = store.state.player.songs.findIndex(
        (item) => item.id === cur.id
      );
      currentIndex.value = curIndex;
      fetchLyric({ id: cur.id });
      onReloadSong();
    }
  }
);

//監聽歌詞
const fetchLyric = async (id) => {
  const res = await getSongLrc(id);
  if (res.code === 200) {
    currentLyric.value = await handlerLyric(res.lrc.lyric);
  }
};

const handlerLyric = async (lyric) => {
  const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
  const songlines = [];
  const lines = lyric.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let result = timeExp.exec(line);
    if (result) {
      const txt = line.replace(timeExp, "").trim();
      if (txt) {
        songlines.push({
          time:
            result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,
          txt,
        });
      }
    }
  }
  songlines.sort((a, b) => {
    return a.time - b.time;
  });

  return {
    songlines,
  };
};

//監聽音量變化
watch(
  () => volume.value,
  (cur) => {
    instance.value.volume = cur;
  }
);

//監聽模式變化
//----------------------------
const onProgress = (e) => {
  // console.log(e, "onProgress1");
  const songsLen = store.state.player.songs.length;
  if (!songsLen) {
    durationTime.value = 0;
    currentTime.value = 0;
  }
  if (songsLen) {
    durationTime.value = e.target.duration;
  }
};

const audioReady = (e) => {
  if (currentLyric.value) {
    // currentLyric.value.seek(currentTime.value * 1000);
  }
  // console.log(e, "audioReady");
};
const audioPaused = (e) => {
  // console.log(e, "audioPaused");
  if (currentLyric.value) {
    // currentLyric.value.stop();
  }
};
const audioEnd = () => {
  // console.log("audioEnd");
  currentTime.value = 0;
  switch (modeType.value) {
    case 0: {
      if (store.state.player.songs.length === 1) {
        onReloadSong();
      } else {
        onNextSong();
      }
      break;
    }
    case 1: {
      onReloadSong();
      break;
    }
    default: {
      let songLen = store.state.player.songs.length;
      // 如果只有一首
      if (songLen === 1) {
        onReloadSong();
        break;
      } else {
        const randomFn = () => {
          // 不能為同一首歌
          let randomIndex =
            utils.getRandomIndex(store.state.player.songs.length) - 1;
          if (currentIndex.value !== randomIndex) {
            currentIndex.value = randomIndex;
          } else {
            randomFn();
          }
        };
        randomFn();
        break;
      }
    }
  }
};

const audioError = () => {
  store.commit(Types.DEL_SONG, { id: currentSong.value.id });
};
//監聽播放時間
const updateTime = (e) => {
  currentTime.value = e.target.currentTime;
  percent.value = (e.target.currentTime / durationTime.value) * 100;
};

const changeProgress = (val) => {
  progressState.value = true;
  const newCurrentTime = (val / 100) * durationTime.value;
  currentTime.value = newCurrentTime;
  percent.value = parseInt(val);
  instance.value.currentTime = newCurrentTime;
  progressState.value = false;
};
</script>
<style lang="scss">
@import "@vueform/slider/themes/default.css";

.playControl {
  display: flex;
  padding-right: 1rem;
  .pause,
  .play {
    cursor: pointer;
    color: #e74c3c;
    width: 3rem;
  }
}
.icon-Sound_,
.icon-left,
.icon-right1,
.icon-Sound_1 {
  color: #c0392b;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 2;
  padding: 0 0.5rem;
}
.controlBox {
  display: flex;
  .soundControl {
    display: flex;
    align-items: center;
    padding-left: 1rem;
    .icon-Sound_1,
    .icon-Sound_ {
      font-size: 1.2rem;
    }
    .slider {
      width: 100px;
      padding-left: 0.5rem;
    }
  }

  .icon-left,
  .icon-right1 {
    line-height: 3;
  }
}
.progressBar {
  min-width: 500px;
  width: 650px;
}
.icon-lyric,
.icon-playlist,
.icon-icon_playall,
.icon-icon_playone,
.icon-random,
.icon-remove,
.icon-remove1 {
  color: #666;
  font-size: 1.5rem;
  padding: 0 1rem;
  line-height: 3;
  &:hover {
    color: #000;
  }
}
.artist {
  width: 60px;
  height: 60px;
  margin: 0 1.5rem;
  border-radius: 5px;
}
// 进入前
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

// 进入的这个阶段
.fade-enter-active {
  transition: all 0.5s ease-in-out;
}
// 进入后
.fade-enter-to {
  transform: scale(1);
  opacity: 1;
}

// 进入的这个阶段
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
// 离开后
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}
// 离开前
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

// 进入前
.fadeLyric-enter-from {
  opacity: 0;
}

// 进入的这个阶段
.fadeLyric-enter-active {
  transition: all 0.5s ease-in-out;
}
// 进入后
.fadeLyric-enter-to {
  opacity: 1;
}

// 进入的这个阶段
.fadeLyric-leave-active {
  transition: all 0.5s ease-in-out;
}
// 离开前
.fadeLyric-leave-from {
  opacity: 1;
}
// 离开后
.fadeLyric-leave-to {
  opacity: 0;
}
</style>
