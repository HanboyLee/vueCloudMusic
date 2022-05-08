<template>
  <div class="songBox">
    <ElImage
      class="img"
      fit="cover"
      :src="picUrl + '?param=100y100'"
      :alt="id"
    />
    <div class="textContent">
      <p>{{ songName }}</p>
      <p>
        <span :key="artist.id" v-for="(artist, index) in artists"
          >{{ artist.name }}
          <span style="margin: 0 3px">{{
            isAddNotsuffix(index, artists.length - 1)
          }}</span>
        </span>
      </p>
    </div>
    <div class="duration">
      {{ $utils.transforTime(duration, "ms") }}
    </div>
  </div>
</template>
<script setup>
defineProps(["artists", "picUrl", "id", "songName", "duration"]);
function isAddNotsuffix(index, len) {
  return len !== index ? "/" : "";
}
</script>
<style lang="scss" scoped>
.songBox {
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > .img {
    width: 100px;
    height: 100px;
  }
  .textContent {
    flex: 1;
    padding: 1rem;
    margin-right: auto;
    & > p {
      &:first-child {
        font-size: 1.2rem;
        font-weight: 800;
      }
      padding: 0.5rem 0;
    }
  }
  .duration {
    text-align: end;
    padding: 1rem;
  }
}
</style>
