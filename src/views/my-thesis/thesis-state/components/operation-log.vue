<template>
  <a-card class="general-card" :title="'论文评阅记录'">
    <a-spin style="width: 100%">
      <a-table :data="renderData">
        <template #columns>
          <a-table-column :title="'操作人'" data-index="name" />
          <a-table-column :title="'当前状态'" data-index="status">
            <template #cell="{ record }">
              <p v-if="record.status === 1">
                <span>论文退回</span>
              </p>
              <p v-if="record.status === 2">
                <span>待评阅</span>
              </p>
              <p v-if="record.status === 3">
                <span>评阅中</span>
              </p>
              <p v-if="record.status === 4">
                <span>评阅完成</span>
              </p>
            </template>
          </a-table-column>
          <a-table-column :title="'操作内容'" data-index="context">
            <template #cell="{ record }">
              <p>
                <span>{{ record.context }}</span>
              </p>
            </template>
          </a-table-column>
          <a-table-column :title="'操作时间'" data-index="time">
            <template #cell="{ record }">
              {{ dayjs(record.time).format('YYYY-MM-DD HH:mm') }}
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-spin>
  </a-card>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { TableData } from '@arco-design/web-vue';
  import dayjs from 'dayjs';

  defineProps({
    renderData: {
      type: Array as PropType<TableData[]>,
      default() {
        return [];
      },
    },
  });
</script>

<style scoped lang="less">
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
</style>
