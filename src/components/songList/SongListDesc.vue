<template>
  <div class="introduce">
    <ElImage
      class="img border-4"
      :src="blurPicUrl + '?param=250y250'"
      :alt="blurPicUrl"
    />
    <div class="rightSider">
      <h2 class="text-2xl font-bold">{{ name }}</h2>
      <div class="pt-3">
        <div class="artistContent">
          <el-avatar :size="30" :src="artistImg1v1Url + '?param=50y50'" />
          <div class="artist">
            <span>
              {{ artistName }}
            </span>
            <span v-if="enAliasName">
              {{ enAliasName }}
            </span>
          </div>
        </div>
      </div>
      <slot name="tag"></slot>
      <div class="commonContent">
        <span>创建时间：</span>
        <span>
          {{ $moment(publishTime).format("yyyy-MM-DD") }}
        </span>
      </div>
      <div v-if="company" class="commonContent">
        <span>发行公司：</span>
        <span>{{ company }}</span>
      </div>
      <div class="mt-4">
        <PlaySongsButton :songs="songs" />
      </div>
    </div>
  </div>
  <div class="albumDesc">
    <slot name="albumTitle"></slot>

    <pre :class="[isExtendText && 'descText', 'whitespace-pre-wrap']">
      {{ description }}
    </pre>
    <div v-if="!disabledLineClamp" class="extend" @click="onExtendHandle">
      {{ isExtendText ? "展開" : "收起" }}
    </div>
  </div>
  <div class="py-8" :span="20">
    <slot name="listInfo"></slot>
    <SongList :datas="songs" />
  </div>
</template>
<script setup>
import { ref } from "vue-demi";
//components
import SongList from "@/components/songList/SongList.vue";
import PlaySongsButton from "@/components/button/PlaySongsButton.vue";
defineProps({
  blurPicUrl: {
    type: String,
  },
  name: {
    type: String,
  },
  artistImg1v1Url: {
    type: String,
  },
  artistName: {
    type: String,
  },
  enAliasName: {
    type: String,
  },
  company: {
    type: String,
  },
  publishTime: {
    type: [String, Number],
  },
  description: {
    type: String,
  },
  songs: {
    type: Array,
  },
  trackIds: {
    type: Array,
  },
  disabledLineClamp: {
    type: Boolean,
    default: false,
  },
});
const isExtendText = ref(true);
const onExtendHandle = () => (isExtendText.value = !isExtendText.value);
</script>
<style lang="scss" scoped>
.rightSider {
  width: 100%;
  padding: 0 2rem;
  .commonContent {
    padding-top: 1rem;
  }
}
.introduce {
  padding-bottom: 2rem;
  display: flex;
  .img {
    min-width: 250px;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 1rem;
  }
  .artistContent {
    display: flex;
    align-items: center;

    padding: 0.5rem 0;
    .artist {
      font-size: 1.1rem;
      flex: 1;
      display: flex;
      align-items: center;
      & > span {
        padding: 0.5rem;
        &:first-child {
          color: red;
        }
      }
      & > span + span {
        color: #999;
      }
    }
  }
}
.albumDesc {
  & > p {
    line-height: 1.5;
  }
  .descText {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .extend {
    color: blue;
    text-align: end;
    padding: 0.5rem;
  }
}
</style>
