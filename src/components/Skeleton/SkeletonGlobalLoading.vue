<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-text="Loading...."
  ></div>
</template>
<script setup>
defineProps({
  loading: {
    type: Boolean,
  },
});
</script>
