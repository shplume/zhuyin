<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.setting']" />
    <a-row style="margin-bottom: 16px">
      <a-col :span="24">
        <UserPanel />
      </a-col>
    </a-row>
    <a-row class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="1" type="rounded">
          <a-tab-pane key="1" :title="'学生信息'">
            <StudentInformation />
          </a-tab-pane>
          <a-tab-pane key="2" :title="'教师信息'">
            <TeacherInformation />
          </a-tab-pane>
          <a-tab-pane key="3" :title="'安全设置'">
            <SecuritySettings />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import UserPanel from '@/views/user/setting/components/user-panel.vue';
  import StudentInformation from '@/views/user/setting/components/student-information.vue';
  import TeacherInformation from '@/views/user/setting/components/teacher-information.vue';
  import SecuritySettings from '@/views/user/setting/components/security-settings.vue';
</script>

<script lang="ts">
  export default {
    name: 'Setting',
  };
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
