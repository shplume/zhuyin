<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 6 }"
    :wrapper-col-props="{ span: 18 }"
  >
    <a-card class="general-card">
      <template #title>论文上传</template>
      <a-form-item :label="'请上传规定格式的论文'" field="file">
        <a-upload
          v-model:file-list="formData.files"
          draggable
          :auto-upload="false"
        />
      </a-form-item>
    </a-card>
    <a-form-item>
      <!-- <a-button type="primary" @click="onNextClick">
          {{ $t('stepForm.button.next') }}
        </a-button> -->
      <a-space>
        <a-button type="secondary" @click="goPrev">
          {{ $t('stepForm.button.prev') }}
        </a-button>
        <a-button type="primary" @click="onNextClick">
          {{ $t('stepForm.button.next') }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { ChannelInfoModel } from '@/api/form';

  const emits = defineEmits(['changeStep']);

  const formRef = ref<FormInstance>();
  const formData = ref<ChannelInfoModel>({
    files: [],
  });

  const onNextClick = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      emits('changeStep', 'submit', { ...formData.value });
    }
  };
  const goPrev = () => {
    emits('changeStep', 'backward');
  };
</script>

<style scoped lang="less">
  .container {
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
    width: 540px;
  }

  .form-content {
    padding: 8px 50px 0 30px;
  }
</style>
