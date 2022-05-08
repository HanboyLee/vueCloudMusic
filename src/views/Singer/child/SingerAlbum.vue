<template>
  <ElRow :gutter="30">
    <ElCol
      @click="onToDeatil(item.id)"
      :span="4"
      v-for="(item, index) in albums.hotAlbums"
      :key="index"
    >
      <CommonCard :datas="item" />
    </ElCol>
    <ElCol>
      <el-pagination
        v-show="!!albums.hotAlbums?.length"
        class="pagination"
        v-model:currentPage="currentPage"
        layout="prev, pager, next"
        :total="singerDeatil.data.artist.albumSize"
        :page-size="30"
      />
    </ElCol>
  </ElRow>
</template>
<script setup>
import { getSignerAlbums } from "@/services/api/singer";
import { computed, ref, watchEffect } from "vue-demi";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

//components
import CommonCard from "@/components/cards/CommonCard.vue";
const route = useRoute();
const router = useRouter();
const store = useStore();
const albums = ref([]);
const currentPage = ref(1);
const limit = ref(30);
const singerDeatil = computed(() => store.state.singer.singerDetail);
const offset = computed(() => {
  return (parseInt(currentPage.value) - 1) * limit.value;
});
watchEffect(async () => {
  try {
    if (route.params.singerId) {
      const datas = await getSignerAlbums({
        id: route.params.singerId,
        offset: offset.value,
        limit: limit.value,
      });
      albums.value = datas;
    }
  } catch (error) {
    console.log(error, "albums");
  }
});

function onToDeatil(id) {
  router.push(`/songListDetail/${id}`);
}
</script>

<style lang="scss" scoped>
.CommonContainer {
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  .img {
    position: relative;
    padding-right: 1rem;
    &::before {
      content: "";
      top: 0;
      left: -5px;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #000;
      position: absolute;
      z-index: -1;
      transition: left 0.3s ease-in-out;
    }
    &:hover::before {
      left: 0px;
    }
  }
  .textWraper {
    padding-top: 0.5rem;
    padding-bottom: 1rem;
    letter-spacing: 1px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.pagination {
  justify-content: center;
  padding: 1rem 0;
}
</style>
