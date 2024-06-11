<template>
  <a-form
    ref="formRef"
    :rules="rules"
    :model="form"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <a-form-item field="account" label="账户名称">
      <a-input v-model="form.account" placeholder="请输入账户名称..." />
    </a-form-item>
    <a-form-item field="password" label="密码" validate-trigger="blur">
      <a-input-password v-model="form.password" placeholder="请输入密码..." />
    </a-form-item>
    <a-form-item field="password2" label="确认密码" validate-trigger="blur">
      <a-input-password v-model="form.password2" placeholder="请确认密码..." />
    </a-form-item>
    <a-form-item field="name" label="姓名">
      <a-input v-model="form.name" placeholder="请输入姓名..." />
    </a-form-item>
    <a-form-item field="phone" label="手机号">
      <a-input v-model="form.phone" placeholder="请输入手机号..." />
    </a-form-item>
    <a-form-item field="major" label="专业">
      <a-input v-model="form.major" placeholder="请输入专业..." />
    </a-form-item>
    <a-form-item field="class" label="班级">
      <a-input v-model="form.class" placeholder="请输入班级..." />
    </a-form-item>
    <a-form-item field="number" label="工号">
      <a-input v-model="form.number" placeholder="请输入教工号..." />
    </a-form-item>
    <a-form-item field="college" label="院系">
      <a-input v-model="form.college" placeholder="请输入院系..." />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" html-type="submit" :loading="loading">
          注册
        </a-button>
        <a-button @click="$refs.formRef.resetFields()">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { queryRegisterStudent } from '@/api/user';
  import useLoading from '@/hooks/loading';

  const formRef = ref();

  const form = reactive({
    account: '', // 账户
    password: '', // 密码
    password2: '', // 密码
    name: '', // 姓名
    phone: '', // 手机号
    number: '', // 工号
    college: '', // 院系
    major: '', // 专业
    class: '', // 班级
  });

  const rules = {
    name: [
      {
        required: true,
        message: '姓名是必填的',
      },
    ],
    password: [
      {
        required: true,
        message: '密码是必填的',
      },
    ],
    password2: [
      {
        required: true,
        message: '密码是必填的',
      },
      {
        validator: (value: any, cb: any) => {
          if (value !== form.password) {
            cb('两个密码不匹配');
          } else {
            cb();
          }
        },
      },
    ],
    account: [
      {
        required: true,
        message: '用户名是必填的',
      },
    ],
    phone: [
      {
        required: true,
        message: '手机号是必填的',
      },
    ],
    number: [
      {
        required: true,
        message: '教工号是必填的',
      },
    ],
    college: [
      {
        required: true,
        message: '院系是必填的',
      },
    ],
    major: [
      {
        required: true,
        message: '专业是必填的',
      },
    ],
    class: [
      {
        required: true,
        message: '班级是必填的',
      },
    ],
  };

  const { loading, setLoading } = useLoading(false);
  const handleSubmit = async ({ values, errors }) => {
    if (!errors) {
      try {
        setLoading(true);
        const res = await queryRegisterStudent({
          account: values.account,
          password: values.password,
          name: values.name,
          phone: values.phone,
          number: values.number,
          college: values.college,
          major: values.major,
          class: values.class,
        });

        if (res.status === 200) {
          Message.success('注册成功');
          await formRef.value?.resetFields();
        }
      } catch (error) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    }
  };
</script>
