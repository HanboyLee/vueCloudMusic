<template>
  <div>
    <!--Selector -->
    <TagBoxes
      title="地区"
      :datas="areasBar"
      :currentTagId="$store.state.mvAll.queryInfo.area"
      :colSpan="3"
      @onCheckChange="(item) => onChangeQuery(Types.SET_MVALL_AREA, item)"
    />
    <TagBoxes
      title="排序"
      :datas="orderBar"
      :currentTagId="$store.state.mvAll.queryInfo.order"
      :colSpan="4"
      @onCheckChange="(item) => onChangeQuery(Types.SET_MVALL_ORDER, item)"
    />
    <TagBoxes
      title="类型"
      :datas="typesBar"
      :currentTagId="$store.state.mvAll.queryInfo.type"
      :colSpan="3"
      @onCheckChange="(item) => onChangeQuery(Types.SET_MVALL_TYPE, item)"
    />

    <!-- Loading -->
    <div v-if="$store.state.mvAll.loading">
      <ElRow>
        <ElCol
          class="m-4"
          :key="item"
          :span="4"
          v-for="item in $store.state.mvAll.queryInfo.limit"
        >
          <SkeletonImageCard :areaImg="{ width: '180px', height: '120px' }" />
        </ElCol>
      </ElRow>
    </div>

    <!-- Main -->
    <div v-else>
      <ElRow>
        <ElCol
          class="m-4"
          :key="item.id"
          :span="4"
          v-for="item in $store.state.mvAll.mvDatas.data"
          @click="to_path_MV_Page(item.id)"
        >
          <VideoCard
            :artistName="item.artistName"
            :playCount="item.playCount"
            :picUrl="item.cover"
            :videoName="item.name"
            :duration="item.duration"
          />
        </ElCol>
        <ElCol class="pagination" :span="24">
          <el-pagination
            background
            v-model:current-page="offset"
            :page-count="countPage"
            @current-change="onPageChange"
            layout="prev, pager, next"
          />
        </ElCol>
      </ElRow>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue-demi";
import { useStore } from "vuex";
import Types from "@/store/types";
import { useRouter } from "vue-router";
//components
import VideoCard from "@/components/cards/VideoCard.vue";
import TagBoxes from "@/components/tag/TagBoxes.vue";
import SkeletonImageCard from "@/components/Skeleton/SkeletonImageCard.vue";

const router = useRouter();
const store = useStore();
const areasBar = ref(["全部", "内地", "港台", "欧美", "日本", "韩国"]);
const orderBar = ref(["上升最快", "最热", "最新"]);
const typesBar = ref(["全部", "官方版", "现场版", "网易出品"]);
const offset = ref(1);
const countPage = computed(
  () => ~~(store.state.mvAll.mvCount / store.state.mvAll.queryInfo.limit)
);

onMounted(() => {
  store.dispatch(Types.FETCH_MV_ALL, store.state.mvAll.queryInfo);
});

watch(
  () => store.state.mvAll.queryInfo,
  (curQueryInfo) => {
    store.dispatch(Types.FETCH_MV_ALL, curQueryInfo);
  },
  {
    deep: true,
  }
);

const onChangeQuery = (type, item) => {
  store.commit(type, item);
};

const onPageChange = (currentIndex) => {
  const offset = (currentIndex - 1) * store.state.mvAll.queryInfo.limit;
  store.commit(Types.SET_MVALL_OFFSET, offset);
};
const to_path_MV_Page = async (id) => {
  router.push({ path: `/mvUrl/${id}` });
};
</script>
<style lang="scss">
.tagBox {
  width: 50%;
  padding: 1rem 0;
}
.pagination {
  margin: 1rem 0;
  text-align: center;
  justify-content: center;
  display: flex !important;
}
</style>
