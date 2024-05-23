<template>
  <div class="image">
    <div class="container">
      <div class="logo"></div>
      <div class="content">
        <div class="content-inner">
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import LoginForm from './components/login-form.vue';
</script>

<style lang="less" scoped>
  .image {
    background-image: url('assets/image.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
  }

  .container {
    display: flex;
    height: 105vh;
    margin-left: 8px;

    .banner {
      width: 550px;
    }

    .content {
      position: relative;
      display: flex;
      flex: 10;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
      margin-left: 100px;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 8px;
      color: var(--color-fill-1);
      font-size: 20px;
    }
  }

  .font {
    font-size: 20px;
    font-weight: 400;
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .container {
      .banner {
        width: 25%;
      }
    }
  }
</style>
