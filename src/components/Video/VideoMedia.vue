<template>
  <video
    class="video"
    controlsList="nodownload"
    :onContextMenu="(e) => e.preventDefault()"
    controls
    :autoPlay="true"
    :poster="poster"
    :src="src"
  />
</template>
<script setup>
defineProps({
  poster: {
    type: String,
  },
  src: {
    type: String,
  },
});
</script>
<style lang="scss">
.video {
  width: 100%;
  max-height: 500px;
}
</style>
