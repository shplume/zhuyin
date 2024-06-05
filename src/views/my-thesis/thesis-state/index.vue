<template>
  <div class="container">
    <Breadcrumb :items="['menu.myThesis', 'menu.myThesis.state']" />
    <a-space direction="vertical" :size="16" fill>
      <a-card class="general-card" :title="'论文评审流程'" :loading="loading">
        <!-- <template #extra>
          <a-space>
            <a-button type="primary">{{ '取消评审流程' }}</a-button>
          </a-space>
        </template> -->
        <a-steps v-model:current="step" line-less class="steps">
          <a-step>{{ '论文提交' }}</a-step>
          <a-step>{{ '评阅中' }}</a-step>
          <a-step>{{ '评阅完成' }}</a-step>
        </a-steps>
      </a-card>
      <OperationLog :render-data="renderData" />
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { queryReviewRecord } from '@/api/thesis';
  import useLoading from '@/hooks/loading';
  import dayjs from 'dayjs';
  import OperationLog from './components/operation-log.vue';

  const renderData = ref([]);
  const step = ref(0);

  const { loading, setLoading } = useLoading(true);
  const fetchData = async () => {
    try {
      const { data } = await queryReviewRecord();
      renderData.value = data.data.sort(
        (a: any, b: any) =>
          dayjs(b.time as string).valueOf() - dayjs(a.time as string).valueOf()
      );

      if (data.data.length !== 0 && data.data[0].status === 1) {
        step.value = 0;
      }

      if (data.data.length !== 0 && data.data[0].status === 2) {
        step.value = 1;
      }

      if (data.data.length !== 0 && data.data[0].status === 3) {
        step.value = 2;
      }

      if (data.data.length !== 0 && data.data[0].status === 4) {
        step.value = 3;
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  .steps {
    max-width: 548px;
    margin: 0 auto 10px;
  }
</style>
