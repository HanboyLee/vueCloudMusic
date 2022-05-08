<template>
  <div class="container" ref="rootRef">
    <TagBoxes
      title="地区"
      :datas="state.area"
      :currentTagId="$store.state.singer.queryInfo.area"
      @onCheckChange="(item) => onChangeQuery(Types.SET_SINGER_AREA, item)"
      maxWidth="50%"
    />
    <TagBoxes
      title="类型"
      :datas="state.type"
      :currentTagId="$store.state.singer.queryInfo.type"
      @onCheckChange="(item) => onChangeQuery(Types.SET_SINGER_TYPE, item)"
      maxWidth="50%"
    />
    <TagBoxes
      title="分类"
      :datas="state.initial"
      :currentTagId="$store.state.singer.queryInfo.initial"
      @onCheckChange="(item) => onChangeQuery(Types.SET_SINGER_INITIAL, item)"
      :colSpan="0.5"
      :titleColSpan="1"
      maxWidth="100%"
    />
  </div>
  <ElRow v-if="$store.state.singer.singerListLoading">
    <ElCol :span="4" :key="item" v-for="item in queryInfo.limit">
      <SkeletonImageCard />
    </ElCol>
  </ElRow>
  <ElRow v-else class="listsContainer">
    <ElCol
      :span="4"
      v-for="(item, index) in $store.state.singer.artists"
      :key="index"
      class="listItem"
      @click="onSingerDetail(item.id)"
    >
      <SingerCard :picUrl="item.picUrl" :name="item.name">
        <template #musicSize> 单曲数{{ item.musicSize }} </template>
      </SingerCard>
    </ElCol>

    <ElCol
      v-show="!$store.state.singer.singerListLoading"
      class="artistPagination"
    >
      <el-pagination
        background
        v-model:current-page="offset"
        :page-count="33"
        @current-change="onPageChange"
        layout="prev,pager, next "
      />
    </ElCol>
  </ElRow>
</template>
<script setup>
import { computed, onBeforeMount, ref, watch } from "@vue/runtime-core";
import Types from "@/store/types";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
//components
import SingerCard from "@/components/cards/SingerCard.vue";
import SkeletonImageCard from "@/components/Skeleton/SkeletonImageCard.vue";
import TagBoxes from "@/components/tag/TagBoxes.vue";
const store = useStore();
const router = useRouter();
const state = computed(() => store.state.singer.navBar);
const queryInfo = computed(() => store.state.singer.queryInfo);
const offset = ref(queryInfo.offset);

onBeforeMount(() => {
  store.dispatch(Types.SINGER_LIST_ASYNC, queryInfo.value);
});

watch(store.state.singer.queryInfo, (cur) => {
  store.dispatch(Types.SINGER_LIST_ASYNC, cur);
});

function onSingerDetail(id) {
  router.push(`/singer/${id}`);
}

const onPageChange = async (val) => {
  let offset = (val - 1) * queryInfo.value.limit;
  let limit = queryInfo.value.limit;
  store.commit(Types.SET_SINGER_PAGINATION, { offset, limit: limit });
};

const onChangeQuery = (type, item) => {
  store.commit(type, item);
};
</script>
<style lang="scss">
.container {
  padding: 1rem;
  .areaWraper {
    justify-content: space-around;
    max-width: 100%;
    padding: 1rem 0;
  }
  .listsContainer {
    width: 100%;
    height: 100%;
    .listItem {
      cursor: pointer;
      padding: 1rem;
      text-align: center;
    }
  }
  .artistPagination {
    padding: 2rem;
    display: flex;
    justify-content: center;
  }
}
</style>
