<template>
  <div class="container">
    <Breadcrumb :items="['menu.myThesis', 'menu.myThesis.upload']" />
    <a-spin :loading="loading" style="width: 100%">
      <a-card class="general-card" :loading="stepLoading">
        <template #title> 论文上传 </template>
        <div class="wrapper">
          <a-steps
            v-model:current="step"
            style="width: 580px"
            line-less
            class="steps"
          >
            <a-step description="论文审批表内容"> 论文基本信息 </a-step>
            <a-step description="上传论文文件"> 上传论文 </a-step>
            <a-step description="论文上传成功"> 上传成功 </a-step>
          </a-steps>
          <keep-alive>
            <BaseInfo v-if="step === 1" @change-step="changeStep" />
            <ChannelInfo
              v-else-if="step === 2"
              :upload-thesis-func="customRequest"
              @change-step="changeStep"
            />
            <Success v-else-if="step === 3" />
          </keep-alive>
        </div>
      </a-card>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { Message, RequestOption } from '@arco-design/web-vue';
  import {
    queryCreateThesis,
    CreateThesisParameter,
    queryUploadThesis,
    queryReviewRecord,
  } from '@/api/thesis';
  import useLoading from '@/hooks/loading';
  import dayjs from 'dayjs';
  import BaseInfo from './components/base-info.vue';
  import ChannelInfo from './components/channel-info.vue';
  import Success from './components/success.vue';

  const step = ref(1);
  const thesisId = ref('');

  const { loading: stepLoading, setLoading: stepSetLoading } =
    useLoading(false);
  onMounted(async () => {
    try {
      stepSetLoading(true);
      const { data } = await queryReviewRecord();

      data.data.sort(
        (a: any, b: any) =>
          dayjs(b.time as string).valueOf() - dayjs(a.time as string).valueOf()
      );

      if (data.data.length !== 0 && data.data[0].status >= 1) {
        step.value = 3;
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      stepSetLoading(false);
    }
  });

  const { loading, setLoading } = useLoading(false);
  const createThesis = async (data: CreateThesisParameter) => {
    setLoading(true);
    try {
      const res = await queryCreateThesis(data);
      thesisId.value = `${res.data.thesisId}`;
      Message.success('创建成功');
      step.value = 2;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const customRequest = (options: RequestOption) => {
    const controller = new AbortController();

    (async function requestWrap() {
      const { onProgress, onError, onSuccess, fileItem } = options;
      onProgress(20);

      const formData = new FormData();
      formData.append('file', fileItem.file as Blob);
      formData.append('thesisId', thesisId.value);

      const onUploadProgress = (event: ProgressEvent) => {
        let percent;
        if (event.total > 0) {
          percent = (event.loaded / event.total) * 100;
        }
        onProgress(parseInt(String(percent), 10), event);
      };

      try {
        const res = await queryUploadThesis(formData, {
          controller,
          onUploadProgress,
        });
        onSuccess(res);
      } catch (error) {
        onError(error);
      }
    })();
    return {
      abort() {
        controller.abort();
      },
    };
  };

  const changeStep = (
    direction: string | number,
    model: CreateThesisParameter | File
  ) => {
    if (direction === 'forward-create') {
      createThesis(model as CreateThesisParameter);
      return;
    }

    if (direction === 'forward') {
      step.value += 1;
      return;
    }

    if (direction === 'backward') {
      step.value -= 1;
    }
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 0;
    background-color: var(--color-bg-2);
    :deep(.arco-form) {
      .arco-form-item {
        &:last-child {
          margin-top: 20px;
        }
      }
    }
  }

  .steps {
    margin-bottom: 76px;
  }
</style>
