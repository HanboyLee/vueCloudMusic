<template>
  <!-- :disabled="isCollection" -->
  <div class="mt-4">
    <ElButton plain :type="withType" :icon="Collection" @click="onSubscribe">
      {{ withText }}
    </ElButton>
  </div>
</template>
<script setup>
import { computed, nextTick, ref, inject } from "vue";
import { Collection } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
//hooks
import { useIsLoginState } from "@/hooks/useIsLoginState";
const props = defineProps({
  id: {
    type: [Number, String],
  },
  isCollection: {
    type: Boolean,
  },
  collectionType: {
    type: String,
  },
});
const store = useStore();
const isLoginState = useIsLoginState();
const currentCollection = ref(props.isCollection);
const withType = computed(() => (currentCollection.value ? "info" : "danger"));
const isOpenLoginModel = inject("isOpenLoginModel");

const withText = computed(() =>
  currentCollection.value ? "已收藏" : "未收藏"
);

// 收藏歌單
const onSubscribe = async () => {
  if (!isLoginState) {
    ElMessage.error({ message: "亲，请先登入，才可收藏。", duration: 1000 });
    return (isOpenLoginModel.value = true);
  }
  currentCollection.value = !currentCollection.value;
  await nextTick(() => {
    store.dispatch(props.collectionType, {
      id: props.id,
      t: currentCollection.value ? 1 : 2,
    });
  });
};
</script>
<style lang="scss" scoped></style>
