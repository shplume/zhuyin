<template>
  <a-form
    ref="formRef"
    :rules="rules"
    :model="form"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <a-form-item field="oldPassword" label="旧密码" validate-trigger="blur">
      <a-input v-model="form.oldPassword" placeholder="请输入旧密码..." />
    </a-form-item>
    <a-form-item field="NewPassword" label="新密码" validate-trigger="blur">
      <a-input-password
        v-model="form.NewPassword"
        placeholder="请输入新密码..."
      />
    </a-form-item>
    <a-form-item
      field="NewPassword2"
      label="确认新密码"
      validate-trigger="blur"
    >
      <a-input-password
        v-model="form.NewPassword2"
        placeholder="请再次输入新密码..."
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" html-type="submit" :loading="loading">
          修改
        </a-button>
        <a-button @click="$refs.formRef.resetFields()">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { queryEditorPassword } from '@/api/user';
  import useLoading from '@/hooks/loading';

  const formRef = ref<FormInstance>();

  const { loading, setLoading } = useLoading(false);
  const handleSubmit = async ({ values, errors }) => {
    if (!errors) {
      try {
        setLoading(true);
        const res = await queryEditorPassword({
          oldPassword: values.oldPassword, // 旧密码
          NewPassword: values.NewPassword, // 新密码
        });

        if (res.status === 200) {
          Message.success('修改成功');
          await formRef.value?.resetFields();
        }
      } catch (error) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    }
  };

  const form = reactive({
    oldPassword: '',
    NewPassword: '',
    NewPassword2: '',
  });

  const rules = {
    oldPassword: [
      {
        required: true,
        message: '旧密码是必填的',
      },
    ],
    NewPassword: [
      {
        required: true,
        message: '新密码是必填的',
      },
    ],
    NewPassword2: [
      {
        required: true,
        message: '新密码是必填的',
      },
      {
        validator: (value, cb) => {
          if (value !== form.NewPassword) {
            cb('两次密码不匹配');
          } else {
            cb();
          }
        },
      },
    ],
  };
</script>
