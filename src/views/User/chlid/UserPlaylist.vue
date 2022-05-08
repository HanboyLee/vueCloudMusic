<template>
  <div class="py-8">
    <h1 class="py-4 font-serif text-2xl">
      <slot name="title" />
      ({{ len }})
    </h1>
    <ElRow :gutter="20">
      <ElCol
        class="cursor-pointer"
        :key="item.id"
        :span="4"
        v-for="item in datas"
        @click="$router.push(`/playlist/${item.id}`)"
      >
        <ImageCard
          :copywriter="item.copywriter"
          :playCount="item.playCount"
          :picUrl="item.coverImgUrl"
          :name="item.name"
        />
      </ElCol>
    </ElRow>
  </div>
</template>
<script setup>
import ImageCard from "@/components/cards/ImageCard.vue";
defineProps({
  datas: {
    type: Array,
    default() {
      return [];
    },
  },
  len: {
    type: Number,
    default() {
      return 0;
    },
  },
});
</script>
<style lang="scss"></style>
