<template>
  <SongList :datas="topSongs" />
</template>
<script setup>
import { getTopsong } from "@/services/api/singer";
import { ref, watchEffect } from "vue-demi";
import { useRoute } from "vue-router";
import SongList from "@/components/songList/SongList.vue";
const route = useRoute();
const topSongs = ref([]);

watchEffect(async () => {
  try {
    if (route.params.singerId) {
      const { songs } = await getTopsong({ id: route.params.singerId });
      topSongs.value = songs;
    }
  } catch (error) {
    console.log(error, "topSongs");
  }
});
</script>
<style lang="scss"></style>
