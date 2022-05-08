<template>
  <div class="h-full flex items-center">
    <ElButton
      :type="isShowTagModel ? 'danger' : 'primary'"
      class="cursor-pointer mx-3 basis-1/12 border-2"
      @click.stop="onShowTags"
    >
      <slot name="categoryTitle" />
      <el-icon class="el-icon--right">
        <ArrowUpBold v-if="isShowTagModel" />
        <ArrowDownBold v-else /> </el-icon
    ></ElButton>
    <div class="flex-1 px-3">
      <div class="flex items-center">
        <div class="text-red-500 font-bold pr-3">
          <slot name="outsideTagTitle" />
          :
        </div>
        <TagItem
          :key="data.id ?? data"
          v-for="data in tagDatas"
          :data="data"
          :currentTagId="currentTagId"
          @onCheckChange="onCheckChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import TagItem from "@/components/tag/TagItem.vue";
import { ArrowUpBold, ArrowDownBold } from "@element-plus/icons-vue";
defineProps({
  tagDatas: {
    type: Array,
  },
  isShowTagModel: {
    type: Boolean,
    default: false,
  },
  currentTagId: {
    type: [Number, String],
  },
});
const emit = defineEmits(["onCheckChange", "onShowTags"]);
const onCheckChange = (item) => {
  emit("onCheckChange", item);
};
const onShowTags = () => {
  emit("onShowTags");
};
</script>
<style lang="scss" scoped></style>
