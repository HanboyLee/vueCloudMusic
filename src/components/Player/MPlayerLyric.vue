<template>
  <div v-if="isShowLyric" class="lyricContent">
    <div class="lyrics" :key="key" v-for="(item, key) in lyricsShow">
      {{ item.txt }}
    </div>
  </div>
</template>
<script setup>
import * as vue from "vue";
const props = defineProps({
  currentLyric: {
    type: [null, Object],
  },
  currentTime: {
    type: Number,
  },
  isShowLyric: {
    type: Boolean,
  },
});
const { currentLyric, currentTime } = vue.toRefs(props);

//歌詞索引
function findCurNum(time, songlines) {
  for (let i = 0; i < songlines.length; i++) {
    if (time <= songlines[i].time) {
      return i;
    }
  }
  return songlines.length - 1;
}
//渲染歌詞
const lyricsShow = vue.computed(() => {
  if (currentLyric.value?.songlines) {
    let startNum, lenNum, index, lyrics;
    index = findCurNum(currentTime.value * 1000, currentLyric.value.songlines);
    startNum = index - 1;
    lenNum = 3 + startNum;
    lyrics = currentLyric.value.songlines.slice(startNum, lenNum);

    return lyrics;
  }
  return [{ txt: "歌词正在加载中～" }];
});
</script>
<style lang="scss" scoped>
.lyricContent {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  text-align: center;
  width: 80%;
  height: auto;
  margin: 0 auto;
  border-radius: 5px 5px 0 0;
  background-color: rgba($color: #000000, $alpha: 0.1);
  overflow: hidden;
  & > div {
    padding: 0.5rem 0;
  }
}
.lyrics {
  color: #fff;
  text-shadow: 0px 0px 5px rgb(1 1 1 / 100%);
  font-size: 1.2rem;
}
</style>
