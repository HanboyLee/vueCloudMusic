<template>
  <div>
    <el-divider />
    <div class="flex gap-4">
      <!-- avatar -->
      <div>
        <el-avatar
          :src="comment.user.avatarUrl + '?param=75y75'"
          shape="square"
          fit="cover"
          :size="50"
        />
      </div>

      <div class="flex justify-between flex-col text-sm flex-1">
        <!--user content -->
        <div>
          <span class="text-blue-400">{{ comment.user.nickname }}：</span>
          <span>
            {{ comment.content }}
          </span>
          <!-- reply origin to comment -->
          <div
            class="border-2 mx-2 mt-4 p-2 bg-gray-100 beforeTriangle before:bg-gray-100"
            v-for="replied in comment.beReplied"
            :key="replied.beRepliedCommentId"
          >
            <div v-if="replied.status !== -5">
              <span class="text-blue-400"> {{ replied.user.nickname }}：</span>
              <span>
                {{ replied.content }}
              </span>
            </div>
            <div v-else>該評論已被刪除</div>
          </div>
        </div>
        <div class="flex justify-between items-center pt-3">
          <div class="text-gray-500">
            {{ $moment(comment.time).format("ll") }}
          </div>
          <div>
            <span class="pr-3">
              <i
                class="text-xl iconfont icon-good-fill align-middle cursor-pointer"
                :class="[{ ['text-blue-300']: comment.liked }]"
              ></i>
              <span>({{ comment.likedCount }})</span>
            </span>
            <span v-if="!!$store.state.userInfo.token">
              |
              <span
                @click="onShowReply"
                class="pl-3 transition-colors text-blue-400 hover:text-blue-400 cursor-pointer"
                >回覆</span
              >
            </span>
          </div>
        </div>

        <CommentPost
          v-if="isShowReplyComment"
          :commentId="comment.commentId"
          :id="replyDatas.id"
          :t="2"
          :type="replyDatas.type"
          :refreshType="refreshType"
          @onCloseReply="onCloseReply"
          buttonContent="回覆"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue-demi";
import CommentPost from "./CommentPost.vue";
const isShowReplyComment = ref(false);
defineProps({
  comment: {
    type: Object,
  },
  replyDatas: {
    type: Object,
    require: true,
  },
  refreshType: {
    type: String,
    require: true,
  },
});

const onCloseReply = () => (isShowReplyComment.value = false);
const onShowReply = () =>
  (isShowReplyComment.value = !isShowReplyComment.value);
</script>
<style lang="scss" scoped>
.beforeTriangle {
  &::before {
    content: "";
    width: 20px;
    height: 10px;
    bottom: 100%;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    position: absolute;
  }
}
.icon-good-fill {
  color: #eee;
  &:hover {
    color: rgb(147 197 253);
  }
}
</style>
