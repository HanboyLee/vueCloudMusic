<template>
  <div class="tagModel">
    <div class="container__arrow container__arrow--tl" />
    <div>
      <span
        :key="data.id"
        v-for="data in $store.state.videoChannel.groupTags"
        class="m-1 inline-block cursor-pointer"
      >
        <TagItem
          :data="data"
          @onCheckChange="onCheckChange"
          :currentTagId="$store.state.videoChannel.groupQueryInfo.id"
        />
      </span>
    </div>
  </div>
</template>
<script setup>
import TagItem from "@/components/tag/TagItem.vue";
const emit = defineEmits(["onCheckChange", "update:isShowTagModel"]);
const onCheckChange = (item) => {
  emit("onCheckChange", item);
  emit("update:isShowTagModel", false);
};
</script>
<style lang="scss" scoped>
.container__arrow {
  /* Size */
  height: 1rem;
  width: 1rem;
  background-color: #fff;
  position: absolute;
}
.container__arrow--tl {
  left: 32px;
  top: 0px;
  border-left: 1px solid rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  transform: translate(50%, -50%) rotate(45deg);
}

.tagModel {
  position: absolute;
  top: 100%;
  left: 0;
  width: 700px;
  z-index: 2;
  border-radius: 5px;
  background: rgba($color: #fff, $alpha: 1);
  box-shadow: 1px 1px 5px;
  padding: 1rem;
}
</style>
