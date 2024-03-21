<script setup>
  import LoginIcon from './components/login-icon.vue';
  import LoginBanner from './components/login-banner.vue';
  import LoginForm from './components/login-form.vue';
  import Footer from './components/login-footer.vue';
</script>

<template>
  <div class="container">
    <LoginIcon />
    <LoginBanner />
    <div class="content">
      <LoginForm />
      <div class="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }
</style>

<style lang="less" scoped>
  @media (max-width: 992px) {
    .container {
      .banner {
        width: 25%;
      }
    }
  }
</style>
