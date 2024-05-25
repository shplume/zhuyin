<template>
  <div class="list-wrap">
    <a-typography-title class="block-title" :heading="6">
      评阅中
    </a-typography-title>
    <a-row class="list-row" :gutter="24">
      <a-col
        v-for="item in renderData"
        :key="item.id"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        :xxl="6"
        class="list-col"
        style="min-height: 162px"
      >
        <div class="card-wrap">
          <a-card :bordered="false" hoverable>
            <a-avatar
              :size="24"
              style="margin-right: 8px; background-color: #626aea"
            >
              <icon-filter />
            </a-avatar>
            <template #actions>
              <a-space>
                <a-button @click="() => {}"> closeTxt </a-button>
                <a-button type="primary" @click="() => {}"> openTxt </a-button>
              </a-space>
            </template>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { queryTheServiceList, ServiceRecord } from '@/api/list';
  import useRequest from '@/hooks/request';

  const defaultValue: ServiceRecord[] = new Array(4).fill({});
  const { loading, response: renderData } = useRequest<ServiceRecord[]>(
    queryTheServiceList,
    defaultValue
  );
</script>

<style scoped lang="less">
  .card-wrap {
    height: 100%;
    transition: all 0.3s;
    border: 1px solid var(--color-neutral-3);
    border-radius: 4px;
    &:hover {
      transform: translateY(-4px);
      // box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    }
    :deep(.arco-card) {
      height: 100%;
      border-radius: 4px;
      .arco-card-body {
        height: 100%;
        .arco-space {
          width: 100%;
          height: 100%;
          .arco-space-item {
            height: 100%;
            &:last-child {
              flex: 1;
            }
            .arco-card-meta {
              height: 100%;
              display: flex;
              flex-flow: column;
              .arco-card-meta-content {
                flex: 1;
                .arco-card-meta-description {
                  margin-top: 8px;
                  color: rgb(var(--gray-6));
                  line-height: 20px;
                  font-size: 12px;
                }
              }
              .arco-card-meta-footer {
                margin-top: 0;
              }
            }
          }
        }
      }
    }
    :deep(.arco-card-meta-title) {
      display: flex;
      align-items: center;

      // To prevent the shaking
      line-height: 28px;
    }
    :deep(.arco-skeleton-line) {
      &:last-child {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }
    }
  }
</style>
