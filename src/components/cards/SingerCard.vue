<template>
  <ElImage
    :lazy="true"
    class="imgBox"
    fit="cover"
    :src="picUrl + '?param=200y200'"
  >
    <template #placeholder>
      <ElImage class="loading" fit="cover" :src="loadingImg" />
    </template>
  </ElImage>
  <div class="descContent">
    <div>
      {{ name }}
    </div>
    <div>
      <slot name="musicSize" />
      <slot name="albumSize" />
    </div>
    <!-- <div>单曲数{{ musicSize }}</div> -->
  </div>
</template>
<script setup>
import loadingImg from "@/assets/images/Loading.gif";
// defineProps(["picUrl", "musicSize", "name"]);
defineProps({
  picUrl: {
    type: String,
  },
  name: {
    type: String,
  },
});
</script>
<style lang="scss" scoped>
.imgBox {
  overflow: hidden;
  border-radius: 10%;
  width: 70%;
  height: 60%;
  min-height: 60%;
  .loading {
    width: 100%;
    height: 100%;
  }
}
.descContent {
  padding: 1rem;
  & > div:first-child {
    letter-spacing: 1px;
  }
  & > div + div {
    color: red;
    padding-top: 10px;
  }
}
</style>
