<template>
  <div class="playlistContent">
    <div class="flex justify-between items-center px-4">
      <i class="iconfont icon-dash" @click="onShrinkModel"></i>
      <span class="text-xl font-serif mr-auto">播放列表</span>
      <i @click="hasVerifySongs(onDelSongs)" class="iconfont icon-remove" />
    </div>

    <div class="list">
      <div class="notSongs" v-if="!$store.state.player.songs.length">
        <div>暂无歌曲</div>
      </div>
      <div class="listWrapper" v-else>
        <div
          :class="[modelValue === index && 'currentIndex']"
          v-for="(item, index) in $store.state.player.songs"
          :key="index"
          class="flex justify-between px-3 py-1 items-center"
        >
          <div @click="onTriggerSong(index)" class="cursor-pointer">
            {{ index + 1 }}
          </div>
          <div @click="onTriggerSong(index)" class="songName">
            {{ item.name }}
          </div>
          <i
            @click="hasVerifySongs(onDelSong(item.id))"
            class="iconfont icon-remove1 text-sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Types from "@/store/types";
import { useStore } from "vuex";
const props = defineProps(["instance", "modelValue"]);
const emit = defineEmits([
  "onCloseList",
  "update:modelValue",
  "update:isShowPlaylist",
]);
const store = useStore();
const hasVerifySongs = (fn) => {
  if (store.state.player.songs.length <= 0) return;
  if (typeof fn !== "undefined") return fn();
};
// 刪除單首歌曲
const onDelSong = (id) => {
  if (id) {
    console.log("onDelSong");
    store.commit(Types.DEL_SONG, { id });
    props.instance.pause();
  }
};
//刪除全部
const onDelSongs = () => {
  console.log("onDelSongs");
  store.commit(Types.CLEAR_SONGS);
  props.instance.pause();
};
//選擇歌曲
const onTriggerSong = (index) => {
  emit("update:modelValue", index);
};
const onShrinkModel = () => {
  emit("update:isShowPlaylist", false);
};
</script>
<style lang="scss" scoped>
.currentIndex {
  background: #f81f1fa1;
  color: #fff;
}
/* songs列表 */
.playlistContent {
  position: absolute;
  width: 300px;
  min-width: 300px;
  bottom: 100%;
  right: 5%;
  box-shadow: 1px 1px 5px 2px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.5);

  .list {
    height: 300px;
    width: 100%;
    overflow: hidden;
    .notSongs {
      line-height: 300px;
      font-size: 2rem;
      opacity: 0.5;
      text-align: center;
      filter: blur(1px);
    }
    ::-webkit-scrollbar {
      display: none;
    }
    .listWrapper {
      height: 100%;
      width: 100%;
      overflow-y: auto;
      .songName {
        padding: 0 0.5rem;
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
  .closePlaylist {
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    z-index: 1;
    cursor: pointer;
  }
  .icon-remove1:hover,
  .icon-remove:hover {
    color: red;
    transition: color 0.3s ease-in-out;
  }
  .iconfont {
    font-size: 1rem;
  }
  .icon-remove1 {
    font-size: 0.8rem;
  }
}
.icon-dash {
  color: red;
  position: relative;
  bottom: 10px;
  right: 10px;
  text-shadow: 0 5px 10px rgb(0 0 0 /30%);
  cursor: pointer;
  font-size: 2.5rem !important;
}
</style>
