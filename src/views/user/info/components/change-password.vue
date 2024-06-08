<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 8 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item
      field="orginal"
      :label="'原密码'"
      :rules="[
        {
          required: true,
          message: '请输入原密码',
        },
      ]"
    >
      <a-input v-model="formData.name" />
    </a-form-item>
    <a-form-item
      field="current"
      :label="'更改密码'"
      :rules="[
        {
          required: true,
          message: '请输入更改后密码',
        },
      ]"
    >
      <a-input v-model="formData.number" />
    </a-form-item>

    <a-form-item
      field="ensure"
      :label="'确认密码'"
      :rules="[
        {
          required: true,
          message: '请确认密码',
        },
      ]"
    >
      <a-input v-model="formData.department" />
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
    orginal: '',
    current: '',
    ensure: '',
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
