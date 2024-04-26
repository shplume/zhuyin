<template>
  <div id="mypdf"></div>
</template>

<script setup>
  // 导入PDFObject
  import PDFObject from 'pdfobject';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { ref, onMounted } from 'vue';

  onMounted(() => {
    const url = 'https://soft.xiaoz.org/office/hee%20hee.pdf';
    PDFObject.embed(url, '#mypdf');
  });
</script>

<style scoped></style>
