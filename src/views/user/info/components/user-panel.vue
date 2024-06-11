<template>
  <a-card :bordered="false">
    <a-space :size="54">
      <a-avatar :size="100" class="info-avatar">
        {{ userStore.name[0] }}
      </a-avatar>

      <a-descriptions
        :data="renderData"
        :column="2"
        :align="'right'"
        layout="inline-horizontal"
        :label-style="{
          width: '140px',
          fontWeight: 'normal',
          color: 'rgb(var(--gray-8))',
        }"
        :value-style="{
          width: '200px',
          paddingLeft: '8px',
          textAlign: 'left',
        }"
      >
      </a-descriptions>
    </a-space>
  </a-card>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store';
  import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';

  const userStore = useUserStore();
  const renderData = [
    {
      label: '用户名：',
      value: userStore.name,
    },
    {
      label: '院系：',
      value: userStore.college,
    },
    {
      label: userStore.role === 'student' ? '学工号：' : '教工号：',
      value: userStore.number,
    },
    {
      label: '电话：',
      value: userStore.phone,
    },
  ] as DescData[];
</script>

<style scoped lang="less">
  .arco-card {
    padding: 14px 0 4px 4px;
    border-radius: 4px;
  }
  :deep(.arco-avatar-trigger-icon-button) {
    width: 32px;
    height: 32px;
    line-height: 32px;
    background-color: #e8f3ff;
    .arco-icon-camera {
      margin-top: 8px;
      color: rgb(var(--arcoblue-6));
      font-size: 14px;
    }
  }
</style>
