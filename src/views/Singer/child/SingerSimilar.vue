<template>
  <ElRow v-if="!!simis.length" class="listsContainer" ref="elRef">
    <ElCol
      :span="4"
      v-for="(item, index) in simis"
      :key="index"
      class="listItem"
      @click="onSingerDetail(item.id)"
    >
      <SingerCard :picUrl="item.picUrl" :name="item.name">
        <template #musicSize> 单曲数{{ item.musicSize }} </template>
      </SingerCard>
    </ElCol>
  </ElRow>
</template>
<script setup>
import { getSingerSimi } from "@/services/api/singer";
import { ref, watchEffect } from "vue-demi";
import { useRoute, useRouter } from "vue-router";
import SingerCard from "@/components/cards/SingerCard.vue";

const route = useRoute();
const router = useRouter();
const simis = ref([]);
watchEffect(async () => {
  try {
    if (route.params.singerId) {
      const { artists } = await getSingerSimi({
        id: route.params.singerId,
      });
      simis.value = artists;
    }
  } catch (error) {
    console.log(error, "SignerDesc");
  }
});
function onSingerDetail(id) {
  router.replace(`/singer/${id}`);
}
</script>
<style lang="scss">
.listsContainer {
  width: 100%;
  height: 100%;
  .listItem {
    cursor: pointer;
    padding: 1rem;
    text-align: center;
  }
}
</style>
