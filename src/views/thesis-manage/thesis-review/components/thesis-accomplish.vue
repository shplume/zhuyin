<template>
  <div class="list-wrap">
    <a-typography-title class="block-title" :heading="6">
      评阅完成
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
                <a-tag size="large" color="green" bordered>评阅完成</a-tag>
              </div>
            </div>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { queryReviewList, ReviewListRelevant } from '@/api/list';
  import useLoading from '@/hooks/loading';
  import dayjs from 'dayjs';

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
        .filter((e) => e.fileState !== 3);
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();

  const props = defineProps({
    onFetchData: {
      type: Boolean,
      default() {
        return () => {
          return true;
        };
      },
    },
  });

  watch(
    () => props.onFetchData,
    () => {
      fetchData();
    }
  );
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
</style>
