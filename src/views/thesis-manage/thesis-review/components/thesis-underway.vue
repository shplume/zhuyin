<template>
  <div class="list-wrap">
    <a-typography-title class="block-title" :heading="6">
      评阅中
    </a-typography-title>
    <div v-if="loading" class="list-loading">
      <a-spin dot />
    </div>
    <a-row v-else class="list-row" :gutter="24">
      <a-col
        v-for="item in renderData"
        :key="item.id"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        :xxl="6"
        class="list-col"
        style="min-height: 162px"
      >
        <div class="card-wrap">
          <a-card :bordered="false" hoverable>
            <div style="height: 70%">
              <div
                style="
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 4px;
                  margin-bottom: 8px;
                "
              >
                {{ item.chineseTitle }}
              </div>
              <div>
                {{ item.englishTitle }}
              </div>
            </div>
            <div style="display: flex; flex-direction: row; height: 30%">
              <div
                style="
                  display: flex;
                  align-items: center;
                  height: 100%;
                  width: 50%;
                "
              >
                {{ `上传者：${item.name}` }}
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  flex-direction: row-reverse;
                  height: 100%;
                  width: 50%;
                "
              >
                <a-button type="primary" @click="onAppraise(item.id)">
                  评阅
                </a-button>
              </div>
            </div>
          </a-card>
        </div>
      </a-col>
    </a-row>

    <a-modal
      v-model:visible="visible"
      width="80%"
      @before-open="handleBeforeOpen"
      @close="handleClose"
    >
      <template #title> 论文评阅 </template>
      <div v-show="!pdfLoading" style="height: 70vh">
        <div id="mypdf" style="height: 100%"></div>
      </div>
      <div
        v-show="pdfLoading"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 70vh;
          background: blue;
        "
      >
        <a-spin dot />
      </div>

      <template #footer>
        <a-space :align="'center'">
          <a-button @click="visible = false">取消</a-button>
          <a-upload
            :custom-request="customRequest"
            :show-file-list="false"
            @success="onOkSuccess"
          >
            <template #upload-button>
              <a-button type="primary">上传评阅书</a-button>
            </template>
          </a-upload>

          <a-trigger trigger="click" :show-arrow="true">
            <a-button type="primary" status="danger">打回</a-button>
            <template #content>
              <div class="send-back">
                <a-space :align="'center'">
                  <a-input
                    v-model="inputContext"
                    :style="{ width: '320px' }"
                    placeholder="请输入打回原因"
                    allow-clear
                  />
                  <a-button
                    type="primary"
                    :loading="sendBackLoading"
                    @click="onSendBack"
                  >
                    确定
                  </a-button>
                </a-space>
              </div>
            </template>
          </a-trigger>
        </a-space>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    queryReviewList,
    ReviewListRelevant,
    queryDownload,
    queryUploadReviews,
    queryReviewSendBack,
  } from '@/api/list';
  import { RequestOption } from '@arco-design/web-vue';
  import useLoading from '@/hooks/loading';
  import dayjs from 'dayjs';
  import PDFObject from 'pdfobject';

  const renderData = ref<ReviewListRelevant[]>([]);

  const { loading, setLoading } = useLoading(true);
  const fetchData = async () => {
    try {
      const { data } = await queryReviewList();

      renderData.value = data.data
        .sort(
          (a: any, b: any) =>
            dayjs(b.uploadTime as string).valueOf() -
            dayjs(a.uploadTime as string).valueOf()
        )
        .filter((e) => e.fileState === 3);
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();

  const visible = ref(false);
  const thesisId = ref(0);
  const onAppraise = (id: number) => {
    thesisId.value = id;
    visible.value = true;
  };
  const { loading: pdfLoading, setLoading: pdfSetLoading } = useLoading(false);
  const pdfUrl = ref('');
  const handleBeforeOpen = async () => {
    try {
      pdfSetLoading(true);
      const res = await queryDownload({
        thesisId: thesisId.value,
      });
      const blob = new Blob([res.data], {
        type: 'application/pdf',
      });
      pdfUrl.value = window.URL.createObjectURL(blob);
      PDFObject.embed(pdfUrl.value, '#mypdf');
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      pdfSetLoading(false);
    }
  };

  const inputContext = ref('');
  const handleClose = () => {
    window.URL.revokeObjectURL(pdfUrl.value);
    inputContext.value = '';
  };

  const customRequest = (options: RequestOption) => {
    const controller = new AbortController();

    (async function requestWrap() {
      const { onProgress, onError, onSuccess, fileItem } = options;
      onProgress(20);

      const formData = new FormData();
      formData.append('file', fileItem.file as Blob);
      formData.append('thesisId', `${thesisId.value}`);

      const onUploadProgress = (event: ProgressEvent) => {
        let percent;
        if (event.total > 0) {
          percent = (event.loaded / event.total) * 100;
        }
        onProgress(parseInt(String(percent), 10), event);
      };

      try {
        const res = await queryUploadReviews(formData, {
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

  const emits = defineEmits(['messagePassing']);
  const onOkSuccess = () => {
    visible.value = false;
    fetchData();
    emits('messagePassing');
  };

  const { loading: sendBackLoading, setLoading: sendBackSetLoading } =
    useLoading(false);
  const onSendBack = async () => {
    try {
      sendBackSetLoading(true);
      await queryReviewSendBack({
        thesisId: thesisId.value,
        reason: inputContext.value,
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      visible.value = false;
      fetchData();
      emits('messagePassing');
      sendBackSetLoading(false);
      inputContext.value = '';
    }
  };
</script>

<style scoped lang="less">
  .list-loading {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-wrap {
    height: 100%;
    transition: all 0.3s;
    border: 1px solid var(--color-neutral-3);
    border-radius: 4px;
    &:hover {
      transform: translateY(-4px);
      // box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    }
    :deep(.arco-card) {
      height: 100%;
      border-radius: 4px;
      .arco-card-body {
        height: 100%;
        .arco-space {
          width: 100%;
          height: 100%;
          .arco-space-item {
            height: 100%;
            &:last-child {
              flex: 1;
            }
            .arco-card-meta {
              height: 100%;
              display: flex;
              flex-flow: column;
              .arco-card-meta-content {
                flex: 1;
                .arco-card-meta-description {
                  margin-top: 8px;
                  color: rgb(var(--gray-6));
                  line-height: 20px;
                  font-size: 12px;
                }
              }
              .arco-card-meta-footer {
                margin-top: 0;
              }
            }
          }
        }
      }
    }
    :deep(.arco-card-meta-title) {
      display: flex;
      align-items: center;

      // To prevent the shaking
      line-height: 28px;
    }
    :deep(.arco-skeleton-line) {
      &:last-child {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }
    }
  }

  .send-back {
    padding: 8px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.8);
  }
</style>
