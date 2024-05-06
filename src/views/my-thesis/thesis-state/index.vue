<template>
  <div class="container">
    <Breadcrumb :items="['menu.myThesis', 'menu.myThesis.state']" />
    <a-space direction="vertical" :size="16" fill>
      <a-card class="general-card" :title="'论文评审流程'">
        <template #extra>
          <a-space>
            <a-button type="primary">{{ '取消评审流程' }}</a-button>
          </a-space>
        </template>
        <a-steps v-model:current="step" line-less class="steps">
          <a-step>{{ '论文提交' }}</a-step>
          <a-step>{{ '评阅中' }}</a-step>
          <a-step>{{ '评阅完成' }}</a-step>
        </a-steps>
      </a-card>
      <!-- <a-card class="general-card">
        <ProfileItem :loading="loading" :render-data="currentData" />
      </a-card>
      <a-card class="general-card">
        <ProfileItem :loading="preLoading" type="pre" :render-data="preData" />
      </a-card> -->
      <OperationLog />
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  // import { queryProfileBasic, ProfileBasicRes } from '@/api/profile';
  // import ProfileItem from './components/profile-item.vue';
  import OperationLog from './components/operation-log.vue';

  const { setLoading } = useLoading(true);
  const { setLoading: preSetLoading } = useLoading(true);
  // const currentData = ref<ProfileBasicRes>({} as ProfileBasicRes);
  // const preData = ref<ProfileBasicRes>({} as ProfileBasicRes);
  const step = ref(1);
  const fetchCurrentData = async () => {
    try {
      // const { data } = await queryProfileBasic();
      // currentData.value = data;
      step.value = 2;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const fetchPreData = async () => {
    try {
      // const { data } = await queryProfileBasic();
      // preData.value = data;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      preSetLoading(false);
    }
  };
  fetchCurrentData();
  fetchPreData();
</script>

<script lang="ts">
  export default {
    name: 'Basic',
  };
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
