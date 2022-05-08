<template>
  <div v-if="!commentCount"></div>
  <div v-else>
    <CommentPost
      :id="replyDatas.id"
      :t="replyDatas.t"
      :type="replyDatas.type"
      :refreshType="refreshType"
    >
      <template #commentCount>
        <div class="flex items-end pb-2 border-b-4 border-b-red-600">
          <div class="text-3xl pr-4">评论</div>
          <div class="text-sm text-gray-500">
            共
            {{ pageTotal ?? 0 }}

            条评论
          </div>
        </div>
      </template>
    </CommentPost>

    <div v-if="hotComments?.length">
      <div class="text-2xl font-bold">热门评论</div>
      <CommentItem
        :comment="hotComment"
        v-for="hotComment in hotComments"
        :key="hotComment.id"
        :replyDatas="replyDatas"
        :refreshType="refreshType"
      />
    </div>
    <div class="mt-20" v-if="comments?.length">
      <div class="text-2xl font-bold">最新评论</div>
      <CommentItem
        :comment="comment"
        v-for="comment in comments"
        :key="comment.id"
        :replyDatas="replyDatas"
        :refreshType="refreshType"
      />
    </div>
    <div class="pt-10">
      <el-pagination
        class="justify-center"
        :total="pageTotal"
        v-model:current-page="curCommentPage"
        layout="prev, pager, next"
        background
        :page-size="pageSize * 1"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue-demi";
import CommentItem from "@/components/comment/CommentItem.vue";
import CommentPost from "@/components/comment/CommentPost.vue";
defineProps({
  commentCount: {
    type: Number,
  },
  hotComments: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  pageTotal: {
    type: Number,
  },
  pageSize: {
    type: [Number, String],
    default: 30,
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
const emit = defineEmits(["onPageChange"]);

const curCommentPage = ref(1);
watch(
  () => curCommentPage.value,
  (cur) => {
    emit("onPageChange", cur);
  }
);
</script>
<style lang="scss" scoped></style>
