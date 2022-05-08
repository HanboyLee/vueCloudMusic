<template>
  <div class="searchModel">
    <div
      class="bg-filter"
      @click.stop="$emit('update:isOpenLoginModel', false)"
    ></div>
    <div class="model">
      <div
        :class="[
          isErrorSumit && 'animate__wobble',
          'modelContent',
          'animate__animated',
        ]"
      >
        <div class="Logo">
          <i class="iconfont icon-wangyiyunyinle"></i>
        </div>
        <div class="fromTable">
          <el-form :model="loginForm" ref="formRef" :rules="rules">
            <el-form-item prop="phone">
              <el-input
                type="text"
                placeholder="请输入网易云音乐手机号"
                v-model="loginForm.phone"
              >
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <i class="iconfont icon-phone"></i>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                class="text-center"
                type="password"
                placeholder="请输入密码"
                v-model="loginForm.password"
                @keypress.enter="submitForm(formRef)"
              >
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <i class="iconfont icon-password"></i>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                :style="{
                  width: '100%',
                }"
                type="danger"
                plain
                @click="submitForm(formRef)"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Types from "@/store/types";
import { ref, watch } from "vue-demi";
import { useStore } from "vuex";
import "animate.css";
const store = useStore();

const emit = defineEmits(["update:isOpenLoginModel"]);
const formRef = ref(null);
const isErrorSumit = ref(false);
const loginForm = ref({
  phone: "",
  password: "",
});
const rules = ref({
  phone: [
    {
      required: true,
      message: "手机号不能空白！",
      trigger: "blur",
    },
    {
      message: "手机号格式不正確！",
      pattern: /^1[3456789]\d{9}$/,
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能空白！",
      trigger: "blur",
    },
  ],
});

//輸入帳密錯誤時發生動畫效果
watch(isErrorSumit, async (cur) => {
  let timer = null;
  clearTimeout(timer);
  if (cur) {
    timer = await setTimeout(() => {
      isErrorSumit.value = false;
    }, 1000);
  }
});

//輸入帳密錯誤後發生動畫效果
watch(
  [() => store.state.userInfo.isLoginFaild, () => store.state.userInfo.token],
  (curIsLoginFaild) => {
    if (curIsLoginFaild[0]) {
      isErrorSumit.value = true;
      store.commit(Types.SET_USER_LOGIN_FAILD, false);
    }
    if (curIsLoginFaild[1]) {
      emit("update:isOpenLoginModel", false);
    }
  }
);

//送出資料
const submitForm = (formRef) => {
  if (!formRef) return;
  formRef.validate((valid) => {
    if (valid) {
      store.dispatch(Types.REQUEST_USER_LOGIN, loginForm.value);
      console.log("submit!");
    } else {
      console.log("error submit!");

      isErrorSumit.value = true;
      return false;
    }
  });
};
</script>
<style lang="scss" scoped>
.searchModel {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .bg-filter {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .model {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    min-width: 400px;
    min-height: 500px;
    height: 500px;
    transform: translate(-50%, -50%);
    box-shadow: -1px -1px 10px rgba($color: #000, $alpha: 0.3);
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;

    & > .modelContent {
      flex: 1;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.5)
        url(../../assets/images/bg_login_model.png) center bottom no-repeat;
      background-size: contain;
    }
  }
}
.Logo {
  text-align: center;
  padding: 2rem;
  overflow: hidden;
  & > .icon-wangyiyunyinle {
    font-size: 2.5rem;
    line-height: 1;
    color: red;
    cursor: unset;
  }
}
input.el-input__inner {
  padding-left: 2.5rem !important;
}
</style>
