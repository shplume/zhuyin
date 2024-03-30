<template>
  <div class="container">
    <Breadcrumb :items="['menu.myThesis', 'menu.myThesis.upload']" />
    <a-form ref="formRef" layout="vertical" :model="formData">
      <a-space direction="vertical" :size="16">
        <a-card class="general-card">
          <template #title> 论文信息 </template>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                :label="'论文标题'"
                field="title"
                :rules="[{ required: true, message: '论文标题不能为空' }]"
                :validate-trigger="['change', 'blur']"
              >
                <a-input
                  v-model="formData.title"
                  :placeholder="'请在这里输入论文标题'"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                :label="'论文作者'"
                field="author"
                :rules="[{ required: true, message: '论文作者不能为空' }]"
                :validate-trigger="['change', 'blur']"
              >
                <a-input
                  v-model="formData.author"
                  :placeholder="'请在这里输入论文作者'"
                >
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card class="general-card">
          <template #title> 论文上传 </template>
          <a-form-item :label="'具体说明'" field="file">
            <a-upload
              v-model:file-list="formData.files"
              draggable
              :auto-upload="false"
            />
          </a-form-item>
        </a-card>
        <a-card class="general-card" :bordered="false">
          <template #title> 论文简介 </template>
          <a-form-item
            :label="'具体说明'"
            field="synopsis"
            :rules="[{ required: true, message: '论文简介不能为空' }]"
            :validate-trigger="['change', 'blur']"
          >
            <a-textarea
              v-model="formData.synopsis"
              :placeholder="'请简单说明，最多不要超多200字。'"
            />
          </a-form-item>
        </a-card>
      </a-space>
      <div class="actions">
        <a-space>
          <a-button> 重置 </a-button>
          <a-button type="primary" :loading="loading" @click="onSubmitClick">
            提交
          </a-button>
        </a-space>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';

  const formData = ref({
    title: '',
    author: '',
    files: [],
    synopsis: '',
  });

  const formRef = ref();
  const { loading, setLoading } = useLoading();
  const onSubmitClick = async () => {
    const res = await formRef.value?.validate();

    window.console.log(formData.value);

    if (!res) {
      setLoading(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 40px 20px;
    overflow: hidden;
  }

  .actions {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    padding: 14px 20px 14px 0;
    background: var(--color-bg-2);
    text-align: right;
  }
</style>
