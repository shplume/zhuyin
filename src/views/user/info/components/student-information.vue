<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 8 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item
      field="name"
      :label="'姓名'"
      :rules="[
        {
          required: true,
          message: '姓名是必填项',
        },
      ]"
    >
      <a-input v-model="formData.name" />
    </a-form-item>
    <a-form-item
      field="number"
      :label="'学号'"
      :rules="[
        {
          required: true,
          message: '学号是必填项',
        },
      ]"
    >
      <a-input v-model="formData.number" />
    </a-form-item>
    <a-form-item
      field="phone"
      :label="'电话'"
      :rules="[
        {
          required: true,
          message: '电话是必填项',
        },
      ]"
    >
      <a-input v-model="formData.phone" />
    </a-form-item>
    <a-form-item
      field="department"
      :label="'院系'"
      :rules="[
        {
          required: true,
          message: '院系是必填项',
        },
      ]"
    >
      <a-input v-model="formData.department" />
    </a-form-item>

    <a-form-item
      field="major"
      :label="'专业'"
      :rules="[
        {
          required: true,
          message: '专业是必填项',
        },
      ]"
    >
      <a-input v-model="formData.major" />
    </a-form-item>

    <a-form-item
      field="class"
      :label="'班级'"
      :rules="[
        {
          required: true,
          message: '班级是必填项',
        },
      ]"
    >
      <a-input v-model="formData.class" />
    </a-form-item>

    <a-form-item>
      <a-space>
        <a-button type="primary" @click="validate">
          {{ $t('userSetting.save') }}
        </a-button>
        <a-button type="secondary" @click="reset">
          {{ $t('userSetting.reset') }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';

  const formRef = ref<FormInstance>();
  const formData = ref<any>({
    name: '',
    number: '',
    department: '',
    major: '',
    class: '',
    phone: '',
  });
  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      // do some thing
      // you also can use html-type to submit
    }
  };
  const reset = async () => {
    await formRef.value?.resetFields();
  };
</script>

<style scoped lang="less">
  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>
