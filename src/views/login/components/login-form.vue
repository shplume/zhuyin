<template>
  <div class="box">
    <div class="login-form-wrapper">
      <div class="picture">
        <img alt="logo" src="../../../assets/logo.png" width="35" />
        <img alt="font" src="../../../assets/art_font.png" width="160s" />
      </div>
      <a-form
        ref="loginForm"
        :model="userAndRegisterInfo"
        class="login-form"
        layout="vertical"
        @submit="handleSubmit"
      >
        <a-form-item
          field="account"
          :rules="[{ required: true, message: '用户名不能为空' }]"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <a-input
            v-model="userAndRegisterInfo.account"
            :placeholder="'用户名'"
          >
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          field="password"
          :rules="[{ required: true, message: '密码不能为空' }]"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <a-input-password
            v-model="userAndRegisterInfo.password"
            :placeholder="'密码'"
            allow-clear
          >
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>

        <div style="margin-bottom: 12px"></div>

        <a-button type="primary" html-type="submit" :loading="loading">
          登录
        </a-button>

        <div style="margin-bottom: 20px"></div>
      </a-form>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';

  const router = useRouter();
  const userStore = useUserStore();

  const userAndRegisterInfo = reactive({
    account: '',
    password: '',
  });

  const { loading, setLoading } = useLoading();
  const handleSubmit = async ({ errors, values }) => {
    if (loading.value) return;

    if (!errors) {
      setLoading(true);
      try {
        await userStore.login({
          account: values.account,
          password: values.password,
        });
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: redirect || 'Info',
          query: {
            ...othersQuery,
          },
        });
        Message.success('欢迎使用');
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    }
  };
</script>

<style lang="less" scoped>
  .font {
    color: rgba(0, 0, 0, 0.648);
  }

  .login-form {
    &-wrapper {
      width: 360px;
      height: 400%;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
      text-align: center;
      margin-bottom: 16px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: rgba(0, 0, 0, 0.733);
    }
  }

  .verify-image {
    margin-left: 16px;
    cursor: pointer;
  }

  .picture {
    flex: 2;
    display: block;
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
