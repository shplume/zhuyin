<template>
  <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
    <a-form-item field="account" label="用户账号">
      <a-input v-model="form.account" placeholder="请输入用户账号" />
    </a-form-item>
    <a-form-item field="password" label="用户密码">
      <a-input
        v-model="form.password"
        placeholder="请输入用户密码，初始密码为‘123456’"
      />
    </a-form-item>
    <a-form-item field="role" label="用户角色">
      <a-select
        v-model="value"
        :options="options"
        :field-names="fieldNames"
        placeholder="请选择用户角色"
      />
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit" type="primary" :style="{ width: '600px' }">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  import { ref, reactive } from 'vue';

  export default {
    setup() {
      const value = ref();
      const fieldNames = { value: 'city', label: 'text' };
      const options = reactive([
        {
          city: '1',
          text: '管理员',
        },
        {
          city: '2',
          text: '教师',
        },
        {
          city: '3',
          text: '学生',
        },
      ]);
      const form = reactive({
        account: '',
        password: '123456',
        role: '',
        value,
      });
      const handleSubmit = () => {
        // console.log(data);
      };

      return {
        form,
        handleSubmit,
        value,
        fieldNames,
        options,
      };
    },
  };
</script>
