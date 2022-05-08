<template>
  <div class="mt-4">
    <ElButton @click="onPlayAll" round plain type="danger" :icon="VideoPlay">
      播放全部
    </ElButton>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import Types from "@/store/types";
import { VideoPlay } from "@element-plus/icons-vue";

const store = useStore();
const props = defineProps({
  songs: {
    type: Array,
    default() {
      return [];
    },
  },
});

const onPlayAll = () => {
  if (props.songs.length) {
    store.dispatch(Types.FETCH_SONGS_ASYNC, props.songs);
  }
};
</script>
<style lang="scss"></style>
