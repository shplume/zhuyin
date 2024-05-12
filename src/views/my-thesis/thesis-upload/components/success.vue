<template>
  <div class="success-wrap">
    <a-result status="success" title="上传成功" subtitle="论文上传成功" />
    <a-space :size="16">
      <a-button key="again" type="secondary" @click="oneMore">
        再次上传
      </a-button>
    </a-space>
    <div class="details-wrapper">
      <a-typography-title :heading="6" style="margin-top: 0">
        补充说明
      </a-typography-title>
      <a-typography-paragraph style="margin-bottom: 0">
        论文上传成功，请注意批阅日期，及时了解论文审批情况
      </a-typography-paragraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const emits = defineEmits(['changeStep']);
  const oneMore = () => {
    emits('changeStep', 1);
  };
</script>

<style scoped lang="less">
  .success-wrap {
    text-align: center;
  }
  :deep(.arco-result) {
    padding-top: 0;
  }
  .details-wrapper {
    width: 895px;
    margin-top: 54px;
    padding: 20px;
    text-align: left;
    background-color: var(--color-fill-2);
  }
</style>
