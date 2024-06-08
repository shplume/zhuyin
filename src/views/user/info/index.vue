<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.info']" />
    <a-row style="margin-bottom: 16px">
      <a-col :span="24">
        <UserPanel />
      </a-col>
    </a-row>
    <a-row v-permission="['admin']" class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="1" type="rounded">
          <a-tab-pane key="1" :title="'详细信息'">
            <SecuritySettings />
          </a-tab-pane>
          <a-tab-pane key="2" :title="'修改密码'">
            <Password />
          </a-tab-pane>
          <a-tab-pane key="3" :title="'修改信息'">
            <AdminInformation />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
    <a-row v-permission="['teacher']" class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="1" type="rounded">
          <a-tab-pane key="1" :title="'详细信息'">
            <SecuritySettings />
          </a-tab-pane>
          <a-tab-pane key="2" :title="'修改密码'">
            <Password />
          </a-tab-pane>
          <a-tab-pane key="4" :title="'信息修改'">
            <TeacherInformation />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
    <a-row v-permission="['student']" class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="1" type="rounded">
          <a-tab-pane key="1" :title="'详细信息'">
            <SecuritySettings />
          </a-tab-pane>
          <a-tab-pane key="2" :title="'修改密码'">
            <Password />
          </a-tab-pane>
          <a-tab-pane key="5" :title="'信息修改'">
            <StudentInformation />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import UserPanel from '@/views/user/info/components/user-panel.vue';
  import SecuritySettings from '@/views/user/info/components/security-settings.vue';
  import StudentInformation from '@/views/user/info/components/student-information.vue';
  import TeacherInformation from '@/views/user/info/components/teacher-information.vue';
  import AdminInformation from '@/views/user/info/components/admin-information.vue';
  import Password from '@/views/user/info/components/change-password.vue';
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
