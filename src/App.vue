<template>
  <div
    :class="[
      isOpenSearchModel && 'blur-xl',
      isOpenLoginModel && 'blur-xl',
      'container',
    ]"
  >
    <router-view
      v-model:isOpenSearchModel="isOpenSearchModel"
      v-model:isOpenLoginModel="isOpenLoginModel"
    />
  </div>

  <!-- 搜尋 -->
  <SearchModel
    v-if="isOpenSearchModel"
    v-model:isOpenSearchModel="isOpenSearchModel"
  />
  <!-- 登入 -->
  <LoginModel
    v-if="isOpenLoginModel"
    v-model:isOpenLoginModel="isOpenLoginModel"
  />
</template>

<script setup>
import { RouterView } from "vue-router";
import { onBeforeMount, ref } from "vue-demi";

import { useStore } from "vuex";
import Types from "./store/types";

//components

import SearchModel from "@/components/model/SearchModel.vue";
import LoginModel from "@/components/model/LoginModel.vue";
const isOpenSearchModel = ref(false);
const isOpenLoginModel = ref(false);
const store = useStore();
onBeforeMount(() => {
  store.dispatch(Types.FETCH_SEARCH_HOT_TAG_ASYNC);
});
</script>

<style lang="scss" scoped>
@import "@/assets/normalize.css";
#app {
  width: 100%;
}

.container {
  margin: 0 auto;
  height: 100%;
  width: 100%;
  display: flex !important;
  min-height: 100vh;
  flex-direction: column;
}
</style>
