<template>
  <Slider
    show-tooltip="drag"
    class="slider"
    v-model="progress"
    @change="changeProgress"
    :format="(v) => `${$utils.formatTime((v / 100) * durationTime)}`"
    size="sm"
  />
</template>
<script setup>
import { ref, watch } from "vue-demi";
import Slider from "@vueform/slider";

const progress = ref(0);
const props = defineProps({
  percent: {
    type: Number,
  },
  durationTime: {
    type: Number,
  },
  currentTime: {
    type: Number,
  },
});
const emit = defineEmits(["changeProgress"]);
watch(
  () => props.percent,
  (cur) => {
    progress.value = parseInt(cur);
  }
);
const changeProgress = (val) => {
  emit("changeProgress", val);
};
</script>
<style lang="scss" scoped>
.slider {
  margin-top: 0.5rem;
}
.runTime {
  color: #333;
}
.progress-bar-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
/* .progress-bar {
  position: relative;
  width: 100%;
  flex: 1;
  height: 3px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  cursor: pointer;
  margin: 0 25px;
  .bar-inner {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    .progress {
      width: 0px;
      background: #fff;
      height: 3px;
      border-radius: 2px;
    }
    .progress-btn {
      position: absolute;
      z-index: 100;
      right: -12px;
      width: 12px;
      height: 12px;
      top: -4.5px;
      background: #eee;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
      transition: all 0.3s;
      border-radius: 50%;
      &::after {
        position: absolute;
        content: " ";
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        background: #ffffff;
        border-radius: 50%;
      }
      &:hover {
        transform: scale(1.2);
      }
    }
  }
} */
</style>
