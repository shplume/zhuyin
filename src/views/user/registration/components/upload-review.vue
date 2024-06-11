<template>
  <a-upload
    draggable
    :custom-request="customRequest"
    :show-file-list="false"
    @success="onOkSuccess"
  >
  </a-upload>
</template>

<script lang="ts" setup>
  import { Message, RequestOption } from '@arco-design/web-vue';
  import { queryUploadReviewsTemplate } from '@/api/list';

  const onOkSuccess = () => {
    Message.success('评阅书上传成功');
  };

  const customRequest = (options: RequestOption) => {
    const controller = new AbortController();

    (async function requestWrap() {
      const { onProgress, onError, onSuccess, fileItem } = options;
      onProgress(20);

      const formData = new FormData();
      formData.append('file', fileItem.file as Blob);

      const onUploadProgress = (event: ProgressEvent) => {
        let percent;
        if (event.total > 0) {
          percent = (event.loaded / event.total) * 100;
        }
        onProgress(parseInt(String(percent), 10), event);
      };

      try {
        const res = await queryUploadReviewsTemplate(formData, {
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
</script>
