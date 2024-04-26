<template>
  <div class="container">
    <div class="left"><pdfview /></div>
    <div class="right">
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Pdfview from './components/pdf-view.vue';
</script>

<style scoped>
  .pdfobject-container {
    height: 100%;
    width: 100%;
    /* border: 1rem solid rgba(0, 0, 0, 0); */
  }

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
    width: 100px;
    background-color: rgba(200, 214, 251, 0.465);
  }
</style>
