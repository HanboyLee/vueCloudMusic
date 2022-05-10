<template>
  <SkeletonGlobalLoading
    :loading="loading"
    v-if="loading"
  ></SkeletonGlobalLoading>
  <div v-else>
    <SongListDesc
      :blurPicUrl="album.blurPicUrl"
      :name="album.name"
      :artistImg1v1Url="album.artist.img1v1Url"
      :artistName="album.artist.name"
      :enAliasName="album.artist.alias[0]"
      :company="album.company"
      :publishTime="album.artist.publishTime"
      :description="album.description"
      :songs="songs"
      :id="route.params.detailId"
      disableCollection
    >
      <template #albumTitle>
        <h4 class="text-xl font-bold py-3">专辑介绍:</h4>
      </template>
    </SongListDesc>
  </div>
</template>
<script setup>
import { computed, onBeforeMount } from "vue-demi";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Types from "@/store/types";
import SkeletonGlobalLoading from "@/components/Skeleton/SkeletonGlobalLoading.vue";
import SongListDesc from "@/components/songList/SongListDesc.vue";

const route = useRoute();
const store = useStore();

const songs = computed(() => {
  return store.state.singer.albumSongs.songs || [];
});
const album = computed(() => {
  return store.state.singer.albumSongs.album || [];
});
const loading = computed(() => store.state.singer.albumSongsLoading);

onBeforeMount(() => {
  store.dispatch(Types.SINGER_ALBUM_SONGS_ASYNC, {
    id: route.params.detailId,
  });
});
</script>
<style lang="scss">
.rightSider {
  padding: 0 2rem;
  .commonContent {
    padding-top: 1rem;
  }
}
.introduce {
  padding-bottom: 2rem;
  display: flex;
  align-items: flex-start;
  .img {
    min-width: 250px;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 1rem;
  }
  .artistContent {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    .artist {
      font-size: 1.1rem;
      & > span {
        padding: 0.5rem;
        &:first-child {
          color: red;
        }
      }
      & > span + span {
        color: #999;
      }
    }
  }
}
.albumDesc {
  & > p {
    line-height: 1.5;
  }
  .descText {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .extend {
    color: blue;
    text-align: end;
    padding: 0.5rem;
  }
}
</style>
