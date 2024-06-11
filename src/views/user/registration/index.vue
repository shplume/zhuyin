<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.regist']" />
    <a-row class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="1" type="rounded">
          <a-tab-pane key="1" :title="'管理员用户注册'">
            <registAdmin />
          </a-tab-pane>
          <a-tab-pane key="2" :title="'教师用户注册'">
            <registTeacher />
          </a-tab-pane>
          <a-tab-pane key="3" :title="'学生用户注册'">
            <registStudent />
          </a-tab-pane>
          <a-tab-pane key="4" :title="'上传评阅书模板'">
            <UploadReview />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import registAdmin from '@/views/user/registration/components/regist-admin.vue';
  import registTeacher from '@/views/user/registration/components/regist-teacher.vue';
  import registStudent from '@/views/user/registration/components/regist-student.vue';
  import UploadReview from '@/views/user/registration/components/upload-review.vue';
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
