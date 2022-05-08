<template>
  <div class="navItem" :class="[{ isActive }]">
    <div @click="$emit('navigate')" :class="[{ isActive }]">{{ name }}</div>
  </div>
</template>
<script setup>
defineProps(["href", "name", "isActive"]);
defineEmits(["navigate"]);
</script>
<style lang="scss">
.navItem {
  background: #eee;
  padding: 1rem;
  flex: 1;
  & > div {
    color: #000;
    text-decoration: none;
    width: 100%;
    height: 100%;
    &.isActive {
      color: #fff;
    }
  }
  &.isActive {
    color: #fff !important;
    background: #000;
  }
}
</style>
