<template>
  <div class="tagModel">
    <div class="container__arrow container__arrow--tl" />
    <div :key="tag.type" v-for="tag in catlistTag">
      <div class="flex items-center">
        <i class="iconfont cursor-default" :class="tag.classIcon" />{{
          tag.type
        }}:
      </div>
      <div class="pl-8">
        <span
          :key="data"
          v-for="data in tag.sub"
          class="m-1 inline-block cursor-pointer"
        >
          <TagItem
            :data="data"
            @onCheckChange="onCheckChange"
            :currentTagId="$store.state.playlist.queryInfo.cat"
          />
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import Types from "@/store/types";
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
defineProps({
  catlist: {
    type: Array,
  },
});
const emit = defineEmits(["update:modelValue"]);
//marge tagTitle與icon
const catlistTag = computed(() => {
  const icons = [
    "icon-diqiu",
    "icon-piano",
    "icon-coffee",
    "icon-smail",
    "icon-music",
  ];
  const catlist = store.state.playlist.catlistTag;
  const subs = store.state.playlist.catlistTag.sub;
  const subsList = [];
  for (const key in catlist.categories) {
    let extractSub = subs
      .filter((sub) => +sub.category === +key)
      .map((v) => v.name);
    subsList.push({
      type: catlist.categories[key],
      sub: extractSub,
      classIcon: icons[key],
    });
  }
  return subsList;
});
function onCheckChange(item) {
  store.commit(Types.SELECTED_CURRENT_TAG, item);
  emit("update:modelValue", false);
}
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
  top: 6%;
  left: 0;
  width: 700px;
  z-index: 2;
  border-radius: 5px;
  background: rgba($color: #fff, $alpha: 1);
  box-shadow: 1px 1px 5px;
  padding: 1rem;
}
</style>
