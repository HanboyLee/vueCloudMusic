<template>
  <div class="p-3 m-3 rounded shadow-md">
    <div class="title">
      <span class="pl-4">
        <slot name="title"></slot>
      </span>
    </div>
    <slot name="content" />
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.title {
  border-left: 3px solid #f00;
  & > span {
    margin-left: 1rem;
    letter-spacing: 1px;
    font-weight: 800;
  }
}
</style>
