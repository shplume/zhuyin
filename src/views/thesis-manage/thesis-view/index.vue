<template>
  <div class="container">
    <div class="left"><pdfview /></div>
    <div class="right">
      <Submit />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Pdfview from '@/views/thesis-manage/thesis-view/components/pdf-view.vue';
  import Submit from '@/views/thesis-manage/thesis-view/components/submit-review.vue';
</script>

<style scoped>
  .container {
    display: flex;
    height: 100%;
    flex-direction: row;
  }

  .left {
    flex: 3;
  }

  .right {
    flex: 1;
  }
</style>
