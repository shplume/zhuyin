<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.setting']" />
    <a-row v-permission="['admin']" class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="1" type="rounded">
          <a-tab-pane key="1" :title="'管理员信息'">
            <AdminInformation />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
    <a-row v-permission="['teacher']" class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="1" type="rounded">
          <a-tab-pane key="1" :title="'教师信息'">
            <TeacherInformation />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
    <a-row v-permission="['student']" class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="1" type="rounded">
          <a-tab-pane key="1" :title="'学生信息'">
            <StudentInformation />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  // import StudentInformation from '@/views/user/setting/components/student-information.vue';
  // import TeacherInformation from '@/views/user/setting/components/teacher-information.vue';
  // import AdminInformation from '@/views/user/setting/components/admin-information.vue';
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
