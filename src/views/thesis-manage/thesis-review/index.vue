<template>
  <div class="container">
    <Breadcrumb :items="['menu.thesisManage', 'menu.thesisManage.review']" />
    <a-row :gutter="20" :align="'stretch'">
      <a-col :span="24">
        <a-card class="general-card" :title="'论文评阅'">
          <a-row justify="space-between">
            <a-col :span="24">
              <a-tabs v-model:active-key="activeKey" type="rounded">
                <a-tab-pane :key="1" :title="'全部'"> </a-tab-pane>
                <a-tab-pane :key="2" :title="'评阅中'"> </a-tab-pane>
                <a-tab-pane :key="3" :title="'评阅完成'"> </a-tab-pane>
              </a-tabs>
              <ThesisUnderway
                v-show="activeKey === 1 || activeKey === 2"
                @message-passing="messagePassing"
              />
              <ThesisAccomplish
                v-show="activeKey === 1 || activeKey === 3"
                :on-fetch-data="onFetchData"
              />
            </a-col>
            <a-link style="position: absolute; top: 60px; right: 20px">
              <template #icon>
                <icon-download />
              </template>
              下载评阅书模板
            </a-link>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ThesisUnderway from './components/thesis-underway.vue';
  import ThesisAccomplish from './components/thesis-accomplish.vue';

  const activeKey = ref(1);

  const onFetchData = ref(true);
  const messagePassing = () => {
    onFetchData.value = !onFetchData.value;
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
    :deep(.arco-list-content) {
      overflow-x: hidden;
    }

    :deep(.arco-card-meta-title) {
      font-size: 14px;
    }
  }
  :deep(.arco-list-col) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  :deep(.arco-list-item) {
    width: 33%;
  }

  :deep(.block-title) {
    margin: 0 0 12px 0;
    font-size: 14px;
  }
  :deep(.list-wrap) {
    // min-height: 140px;
    .list-row {
      align-items: stretch;
      .list-col {
        margin-bottom: 16px;
      }
    }
    :deep(.arco-space) {
      width: 100%;
      .arco-space-item {
        &:last-child {
          flex: 1;
        }
      }
    }
  }
</style>
