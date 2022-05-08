<template>
  <div class="">
    <div class="briefDesc">
      <div class="py-4">
        <h3 class="text-lg border-b-2 border-b-red-500">
          {{ singerDeatil.data.artist.name }}介紹
        </h3>
      </div>
      <p>
        {{ desc.briefDesc }}
      </p>
    </div>
    <div
      class="introduction"
      v-for="(item, index) in desc.introduction"
      :key="index"
    >
      <div class="py-4">
        <h3 class="text-lg border-b-2 border-b-red-500">{{ item.ti }}</h3>
      </div>
      <pre>{{ item.txt }}</pre>
    </div>
  </div>
</template>
<script setup>
import { getSignerDesc } from "@/services/api/singer";
import { computed, ref, watchEffect } from "vue-demi";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();
const singerDeatil = computed(() => store.state.singer.singerDetail);

const desc = ref({});

watchEffect(async () => {
  try {
    if (route.params.singerId) {
      const datas = await getSignerDesc({
        id: route.params.singerId,
      });
      desc.value = datas;
    }
  } catch (error) {
    console.log(error, "SignerDesc");
  }
});
</script>
<style lang="scss">
.briefDesc {
  & > h3 {
    color: #888;
    text-align: center;
  }
  & > p {
    line-height: 1.5;
  }
}
.introduction {
  width: 100%;
  & > pre {
    white-space: pre-wrap;
    line-height: 1.5;
  }
}
</style>
