<template>
  <div class="container">
    <a-upload
      ref="uploadRef"
      :auto-upload="false"
      :custom-request="props.uploadThesisFunc"
      :limit="1"
      draggable
      @success="successCallback"
    >
    </a-upload>
    <a-space class="container-space" size="large">
      <a-button type="secondary" @click="goPrev"> 返回上一步 </a-button>
      <a-button type="primary" @click="onNextClick"> 提交论文 </a-button>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { ref, PropType } from 'vue';
  import { Message, RequestOption, UploadRequest } from '@arco-design/web-vue';

  const uploadRef = ref();
  const onNextClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    uploadRef.value.submit();
  };

  const emits = defineEmits(['changeStep']);
  const goPrev = () => {
    emits('changeStep', 'backward');
  };

  const props = defineProps({
    uploadThesisFunc: {
      type: Function as PropType<
        ((option: RequestOption) => UploadRequest) | undefined
      >,
      default() {
        return (): UploadRequest | undefined => {
          return undefined;
        };
      },
    },
  });

  const successCallback = () => {
    Message.success('论文上传成功');
    emits('changeStep', 'forward');
  };
</script>

<style scoped lang="less">
  .container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;

    &-space {
      margin-top: 32px;
    }
  }</style
>PropType,
