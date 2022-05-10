<template>
  <!-- :disabled="isCollection" -->
  <div class="mt-4">
    <ElButton plain :type="withType" :icon="Collection" @click="onSubscribe">
      {{ withText }}
    </ElButton>
  </div>
</template>
<script setup>
import { computed, nextTick, ref } from "vue";
import { Collection } from "@element-plus/icons-vue";
import { useStore } from "vuex";
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
const currentCollection = ref(props.isCollection);

const withType = computed(() => (currentCollection.value ? "info" : "danger"));
const withText = computed(() =>
  currentCollection.value ? "已收藏" : "未收藏"
);

// 收藏歌單
const onSubscribe = async () => {
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
