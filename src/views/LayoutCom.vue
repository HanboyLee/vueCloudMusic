<template>
  <div>
    <div class="header">
      <ElRow class="row">
        <ElCol :span="3" class="p-4" justify="center" align="center"
          ><i
            class="iconfont icon-wangyiyunyinle logo"
            @click="$router.push('/')"
          ></i
        ></ElCol>
        <ElCol :span="15">
          <ElMenu
            :default-active="$route.path"
            mode="horizontal"
            router
            class="nav"
          >
            <ElMenuItem index="/">个性推荐</ElMenuItem>
            <ElMenuItem index="/playlist">歌单</ElMenuItem>
            <ElMenuItem index="/topList">排行榜</ElMenuItem>
            <ElMenuItem index="/singer">歌手</ElMenuItem>
            <ElMenuItem index="/mvlatest">ＭＶ</ElMenuItem>
            <ElMenuItem index="/videoChannel">视频</ElMenuItem>
          </ElMenu>
        </ElCol>

        <ElCol
          :span="5"
          class="flex-nowrap justify-center gap-3 flex items-center"
        >
          <!-- 搜尋 -->
          <i
            class="text-lg iconfont icon-search cursor-pointer text-sky-400"
            @click="$emit('update:isOpenSearchModel', true)"
          ></i>
          <div class="text-lg text-gray-400">|</div>
          <!-- 已登入 -->
          <div
            v-if="$store.state.userInfo?.profile?.avatarUrl"
            class="flex items-center gap-2 cursor-pointer userPofile"
            @mouseenter.stop="onMouseEvent(true)"
            @mouseleave.stop="onMouseEvent(false)"
          >
            <el-avatar
              :src="$store.state.userInfo?.profile?.avatarUrl"
              size="small"
            />
            <div class="flex gap-1 items-center">
              <span class="whitespace-nowrap overflow-hidden text-ellipsis">{{
                $store.state.userInfo?.profile?.nickname
              }}</span>
              <ArrowDown v-if="!isShowSubModel" class="w-4" />
              <ArrowUp v-else class="w-4" />
            </div>
            <!-- 個人menu -->
            <ProfileModel
              v-if="isShowSubModel"
              v-model:isShowSubModel="isShowSubModel"
            />
          </div>
          <!-- 未登入 -->
          <div
            v-else
            @click="$emit('update:isOpenLoginModel', true)"
            class="text-lg cursor-pointer"
          >
            登入
          </div>
        </ElCol>
      </ElRow>
    </div>
    <!-- 主要內容 -->
    <div class="main">
      <Suspense>
        <template #fallback>
          <p>loading...</p>
        </template>
        <!-- 主要內容 -->
        <router-view v-slot="{ Component, route }">
          <keep-alive>
            <component
              :is="Component"
              :key="route.name"
              v-if="route.meta.keepAlive"
            />
          </keep-alive>
          <component
            v-if="!route.meta.keepAlive"
            :is="Component"
            :key="route.fullPath"
          />
        </router-view>
      </Suspense>
    </div>
    <div class="footer"></div>
    <PlayerBar />
  </div>
</template>
<script setup>
import { ArrowDown, ArrowUp } from "@element-plus/icons-vue";
import ProfileModel from "@/components/model/ProfileModel.vue";
import PlayerBar from "@/views/PlayerBar/PlayerBar.vue";
import { ref } from "vue-demi";
const isShowSubModel = ref(false);
defineEmits(["update:isOpenSearchModel", "update:isOpenLoginModel"]);

const onMouseEvent = (isShow) => {
  isShowSubModel.value = isShow;
};
</script>
<style lang="scss" scoped>
.logo {
  height: 100%;
  vertical-align: middle;
  color: red;
  cursor: pointer;
  font-size: 1.2rem;
}
.nav {
  border: none !important;
}
.row {
  padding: 1rem 0;
}
.userPofile {
  position: relative;
}
.header {
  height: 50px;
}

.main {
  height: 100%;
  margin-top: 2rem;
  overflow: unset;
  flex: 1;
}
.footer {
  height: 70px;
}
</style>
