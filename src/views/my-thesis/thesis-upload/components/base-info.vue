<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 6 }"
    :wrapper-col-props="{ span: 18 }"
  >
    <a-form-item
      field="chineseTitle"
      label="中文标题"
      :rules="[
        {
          required: true,
          message: '请输入中文标题',
        },
        {
          match: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,40}$/,
          message: '最多 40 字',
        },
      ]"
    >
      <a-input v-model="formData.chineseTitle" :placeholder="'最多 40 字'" />
    </a-form-item>
    <a-form-item
      field="englishTitle"
      label="英文标题"
      :rules="[
        {
          required: true,
          message: '请输入英文标题',
        },
        {
          match: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/,
          message: '最多 100 字',
        },
      ]"
    >
      <a-input v-model="formData.englishTitle" :placeholder="'最多 100 字'" />
    </a-form-item>
    <a-form-item
      field="authors"
      label="论文作者"
      :rules="[
        {
          required: true,
          message: '请输入论文作者',
        },
      ]"
    >
      <a-input-tag
        v-model="formData.authors"
        placeholder="请输入论文作者，点击回车添加"
        allow-clear
      />
    </a-form-item>
    <a-form-item
      field="teachers"
      label="指导教师"
      :rules="[
        {
          required: true,
          message: '请输入指导教师',
        },
      ]"
    >
      <a-input-tag
        v-model="formData.teachers"
        placeholder="请输入指导教师，点击回车添加"
        allow-clear
      />
    </a-form-item>
    <a-form-item
      field="firstAdvance"
      label="第一创新点"
      :rules="[
        {
          required: true,
          message: '请输入论文第一创新点',
        },
      ]"
    >
      <a-textarea
        v-model="formData.firstAdvance"
        placeholder="请输入论文第一创新点"
        :max-length="{ length: 400, errorOnly: true }"
        allow-clear
        show-word-limit
      />
    </a-form-item>
    <a-form-item
      field="secondAdvance"
      label="第二创新点"
      :rules="[
        {
          required: true,
          message: '请输入论文第二创新点',
        },
      ]"
    >
      <a-textarea
        v-model="formData.secondAdvance"
        placeholder="请输入论文第二创新点"
        :max-length="{ length: 400, errorOnly: true }"
        allow-clear
        show-word-limit
      />
    </a-form-item>
    <a-form-item
      field="thirdAdvance"
      label="第三创新点"
      :rules="[
        {
          required: true,
          message: '请输入论文第三创新点',
        },
      ]"
    >
      <a-textarea
        v-model="formData.thirdAdvance"
        placeholder="请输入论文第三创新点"
        :max-length="{ length: 400, errorOnly: true }"
        allow-clear
        show-word-limit
      />
    </a-form-item>
    <a-form-item
      field="drawback"
      label="论文不足"
      :rules="[
        {
          required: true,
          message: '论文不足之处，包括改进方向等',
        },
      ]"
    >
      <a-textarea
        v-model="formData.drawback"
        placeholder="论文不足之处，包括改进方向等"
        :max-length="{ length: 400, errorOnly: true }"
        allow-clear
        show-word-limit
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="onNextClick"> 下一步 </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { CreateThesisParameter } from '@/api/thesis';

  const emits = defineEmits(['changeStep']);
  const formRef = ref<FormInstance>();
  const formData = ref<CreateThesisParameter>({
    chineseTitle: '',
    englishTitle: '',
    authors: [],
    teachers: [],
    firstAdvance: '',
    secondAdvance: '',
    thirdAdvance: '',
    drawback: '',
  });

  const onNextClick = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      emits('changeStep', 'forward-create', { ...formData.value });
    }
  };
</script>

<style scoped lang="less">
  .container {
    padding: 20px;
    .keep-margin {
      margin-bottom: 20px;
    }
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 0;
    background-color: var(--color-bg-2);
  }

  .steps {
    margin-bottom: 36px;
  }

  .form {
    width: 500px;
  }

  .form-content {
    padding: 8px 50px 0 30px;
  }
</style>
