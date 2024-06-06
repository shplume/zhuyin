<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.regist']" />
    <a-row class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="1" type="rounded">
          <a-tab-pane key="1" :title="'用户注册'">
            <regist />
          </a-tab-pane>
          <a-tab-pane key="2" :title="'批量注册'">
            <batch />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import regist from '@/views/user/registration/components/regist.vue';
  import batch from '@/views/user/registration/components/batch.vue';
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  .wrapper {
    padding: 20px 0 0 20px;
    min-height: 580px;
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }

  :deep(.section-title) {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 14px;
  }
</style>
