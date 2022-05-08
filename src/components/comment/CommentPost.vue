<template>
  <div class="pt-10">
    <slot name="commentCount" />
    <div class="flex py-4">
      <ElAvatar
        :icon="UserFilled"
        :src="$store.state.userInfo?.profile?.avatarUrl"
      />
      <vxe-textarea
        :disabled="!isLogin"
        class="pl-4"
        v-model.trim="inputContent"
        placeholder="评论"
        maxlength="140"
        show-word-count
        resize="none"
        rows="3"
      />
    </div>
    <div class="text-right">
      <vxe-button
        @click="onReplyMessage"
        status="primary"
        :content="buttonContent"
        :disabled="!isLogin"
      ></vxe-button>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue-demi";
import { UserFilled } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import Types from "@/store/types";
const props = defineProps({
  id: {
    type: [String, Number],
    require: true,
  },
  t: {
    type: Number,
    default: 1,
  },
  type: {
    type: Number,
    require: true,
  },
  commentId: {
    type: [String, Number],
  },
  refreshType: {
    type: String,
  },
  buttonContent: {
    type: String,
    default: "评论",
  },
});
const store = useStore();
const isLogin = computed(() => !!store.state.userInfo.token);
const inputContent = ref("");
const emit = defineEmits(["onCloseReply"]);
const onReplyMessage = () => {
  if (!inputContent.value)
    return ElMessage.warning({ message: "您尚未输入讯息内容" });

  store.dispatch(Types.FETCH_COMMENT_CURRENT, {
    id: props.id,
    t: props.t,
    type: props.type,
    content: inputContent.value,
    commentId: props.commentId,
    refreshType: props.refreshType,
  });
  inputContent.value = "";
  // 回覆樓層後關閉視窗
  if (props.commentId) {
    emit("onCloseReply");
  }
};
</script>
<style lang="scss"></style>
