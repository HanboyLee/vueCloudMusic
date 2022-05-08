<template>
  <vxe-table
    border
    :data="datas"
    show-header-overflow
    show-overflow
    :max-height="500"
    :row-config="{ isHover: true, isCurrent: true }"
    @cell-dblclick="throttle($event)"
    align="center"
    :loading="loading"
  >
    <vxe-column type="seq" title="序号" width="60"></vxe-column>
    <vxe-column field="name" title="歌曲"></vxe-column>
    <vxe-column title="歌手">
      <template #default="{ row }">
        <span>{{ row.ar[0].name }}</span>
      </template>
    </vxe-column>
    <vxe-column field="al.name" title="专辑">
      <template #default="{ row }">
        <div class="flex items-center gap-2 cellImg overflow-hidden">
          <img
            class="w-7 h-4 object-cover"
            :src="row.al.picUrl + '?param=30y30'"
            alt="row.al.picUrl"
          />
          <el-tooltip :content="row.al.name" placement="top">
            <div class="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
              {{ row.al.name }}
            </div>
          </el-tooltip>
        </div>
      </template>
    </vxe-column>

    <vxe-column width="100" title="时长">
      <template #default="{ row }">
        <span>{{ $utils.transforTime(row.dt, "ms") }}</span>
      </template>
    </vxe-column>
  </vxe-table>
</template>
<script setup>
import { useStore } from "vuex";
import Types from "@/store/types";
import { useThrottle } from "@/hooks/useDebounceRef";
const throttle = useThrottle(onCellClick, 2000);
defineProps({
  datas: {
    type: Array,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const store = useStore();
function onCellClick({ row }) {
  store.dispatch(Types.FETCH_SONG_ASYNC, row);
}
</script>
<style lang="scss">
.cellImg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  & > img {
    border-radius: 10px;
    overflow: hidden;
    height: 30px;
  }
  & > span {
    padding: 0 1rem;
  }
}
</style>
