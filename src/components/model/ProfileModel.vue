<template>
  <div class="wrapperModel">
    <div class="tagModel">
      <div class="container__arrow container__arrow--tl" />
      <div
        class="flex justify-center items-center gap-2 text-sm hover:text-red-500"
        @click="$router.push(`/profile/${store.state.userInfo.profile.userId}`)"
      >
        <i class="iconfont icon-profile text-sm"></i>
        <span>个人主页</span>
      </div>
      <el-divider />
      <div
        class="flex justify-center items-center gap-2 text-sm hover:text-red-500"
        @click="onLogout"
      >
        <i class="iconfont icon-logout text-sm"></i>
        <span>退出登入</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import Types from "@/store/types";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const emit = defineEmits(["update:isShowSubModel"]);
const store = useStore();
const router = useRouter();
const onLogout = () => {
  store.dispatch(Types.REQUEST_USER_LOGOUT);
  emit("update:isShowSubModel", false);
  router.push("/");
};
</script>
<style lang="scss" scoped>
.wrapperModel {
  position: absolute;
  top: 100%;
  left: 0;
  padding: 1rem;
  .tagModel {
    width: 100px;
    min-width: 100px;
    z-index: 100;
    border-radius: 5px;
    background: rgba($color: #fff, $alpha: 0.6);
    box-shadow: 1px 1px 5px;
    box-sizing: content-box;
    padding: 1rem;
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
  }
}
.iconfont {
  color: unset;
  font-size: 1rem;
}
</style>
