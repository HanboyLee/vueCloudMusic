<template>
  <ElRow :gutter="20">
    <ElCol
      v-for="item in mvs"
      :key="item.id"
      :span="4"
      @click="to_path_MV_Page(item.id)"
    >
      <VideoCard
        :artistName="item.artistName"
        :playCount="item.playCount"
        :picUrl="item.imgurl"
        :videoName="item.name"
        :duration="item.duration"
      />
    </ElCol>
  </ElRow>
  <el-pagination
    v-show="mvs.length"
    class="pagination"
    v-model:currentPage="currentPage"
    layout="prev, pager, next"
    :total="singerDeatil.data.artist.mvSize"
    :page-size="limit"
    background
  />
</template>
<script setup>
import { getSingerMv } from "@/services/api/singer";
import { computed, ref, watchEffect } from "vue-demi";
import { useRoute, useRouter } from "vue-router";
import VideoCard from "@/components/cards/VideoCard.vue";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();
const limit = ref(18);
const currentPage = ref(1);
const offset = computed(() => (currentPage.value - 1) * limit.value);
const mvs = ref([]);
const singerDeatil = computed(() => store.state.singer.singerDetail);
watchEffect(async () => {
  try {
    if (route.params.singerId) {
      const datas = await getSingerMv({
        id: route.params.singerId,
        offset: offset.value,
        limit: limit.value,
      });
      mvs.value = datas.mvs;
    }
  } catch (error) {
    console.log(error, "SingerMv");
  }
});

const to_path_MV_Page = async (id) => {
  router.push({ path: `/mvUrl/${id}` });
};
</script>
<style lang="scss">
.pagination {
  justify-content: center;
  padding: 1rem 0;
}
</style>
