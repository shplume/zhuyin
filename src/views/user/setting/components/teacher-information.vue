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
      field="workplace"
      :label="'工作单位'"
      :rules="[
        {
          required: true,
          message: '工作单位是必填项',
        },
      ]"
    >
      <a-input v-model="formData.workplace" />
    </a-form-item>

    <a-form-item
      field="title"
      :label="'职称'"
      :rules="[
        {
          required: true,
          message: '职称是必填项',
        },
      ]"
    >
      <a-input v-model="formData.title" />
    </a-form-item>

    <a-form-item
      field="major"
      :label="'学科专长'"
      :rules="[
        {
          required: true,
          message: '学科专长是必填项',
        },
      ]"
    >
      <a-input v-model="formData.major" />
    </a-form-item>

    <a-form-item
      field="class"
      :label="'导师类别'"
      :rules="[
        {
          required: true,
          message: '导师类别是必填项',
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
    workplace: '',
    title: '',
    major: '',
    class: '',
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
