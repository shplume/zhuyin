<template>
  <div class="container">
    <Breadcrumb :items="['menu.myThesis', 'menu.myThesis.state']" />
  </div>
</template>

<script lang="ts" setup></script>

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
