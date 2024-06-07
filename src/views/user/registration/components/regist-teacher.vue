<template>
  <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
    <a-form-item field="name" label="用户姓名">
      <a-input v-model="form.name" placeholder="请输入用户姓名" />
    </a-form-item>
    <a-form-item field="college" label="用户院系">
      <a-input v-model="form.college" placeholder="请输入用户院系" />
    </a-form-item>
    <a-form-item field="phone" label="用户电话">
      <a-input v-model="form.phone" placeholder="请输入用户电话" />
    </a-form-item>
    <a-form-item field="number" label="用户教工号">
      <a-input v-model="form.number" placeholder="请输入用户教工号" />
    </a-form-item>
    <a-form-item field="password" label="用户密码">
      <a-input
        v-model="form.password"
        placeholder="请输入用户密码，初始密码为‘123456’"
      />
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit" type="primary" :style="{ width: '600px' }">
        提交
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  import { reactive } from 'vue';

  export default {
    setup() {
      const form = reactive({
        name: '',
        college: '',
        number: '',
        password: '123456',
        role: 'teacher',
      });
      const handleSubmit = () => {
        // console.log(data);
      };

      return {
        form,
        handleSubmit,
      };
    },
  };
</script>
