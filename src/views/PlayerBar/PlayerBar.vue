ede
<template>
  <div ref="playerRef" class="player" :class="[isIntoPlayerArea && 'inArea']">
    <i
      @click="onLock(false)"
      v-if="isLock"
      class="iconfont icon-lock lock"
      :class="[isLock && 'text-red-500']"
    ></i>
    <i @click="onLock(true)" v-else class="iconfont icon-unlock unlock"></i>
    <MPlayer />
  </div>
</template>
<script setup>
import MPlayer from "@/components/Player/MPlayer.vue";
import { onMounted, onUnmounted, ref } from "vue-demi";

const isLock = ref(false);
const playerRef = ref(null);
const onLock = (state) => (isLock.value = state);
const isIntoPlayerArea = ref(false);
const mouseHandler = (target) => {
  const playerTop = playerRef.value.offsetTop - 25;
  if (isLock.value) {
    return (isIntoPlayerArea.value = true);
  }
  if (playerTop < target.clientY) {
    isIntoPlayerArea.value = true;
  } else {
    isIntoPlayerArea.value = false;
  }
};
onMounted(() => {
  if (playerRef) {
    window.addEventListener("mousemove", mouseHandler, true);
  }
});
onUnmounted(() => {
  window.removeEventListener("mousemove", mouseHandler, true);
});
</script>
<style lang="scss" scoped>
.player {
  width: 100%;
  display: block;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%);
  height: 70px;
  z-index: 100;
  background: rgba(0, 0, 0, 0.3);
  padding: 0 2rem;
  transition: all 0.5s ease;

  & > .lock,
  & > .unlock {
    position: absolute;
    left: 1%;
    bottom: 100%;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50% 50% 0 0;
    width: 40px;
    text-align: center;
    cursor: pointer;
  }
}
.inArea {
  transform: translate(-50%, 0);
}
</style>
