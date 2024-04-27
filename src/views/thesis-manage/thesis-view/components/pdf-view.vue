<template>
  <div id="mypdf"></div>
</template>

<script setup>
  import PDFObject from 'pdfobject';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { onMounted } from 'vue';

  onMounted(() => {
    const url = 'https://soft.xiaoz.org/office/hee%20hee.pdf';
    PDFObject.embed(url, '#mypdf');
  });
</script>

<style scoped>
  .pdfobject-container {
    height: 100%;
    width: 100%;
  }
</style>
