<script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import ImageCaptcha from '@/utils/captcha-generator';

  const router = useRouter();
  const userStore = useUserStore();
  const isRegister = ref(false);

  const verifyImageSrc = ref('');
  const verifyImageStr = ref('');

  const getVerifyImageInfo = async () => {
    const captcha = new ImageCaptcha({
      height: 30,
    });
    const imageUrl = await captcha.getCaptchaImageUrl();
    verifyImageSrc.value = imageUrl;
    verifyImageStr.value = captcha.captchaText;
  };

  onMounted(async () => {
    try {
      await getVerifyImageInfo();
    } catch (error) {
      //
    }
  });

  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    account: '',
    password: '',
  });

  const userAndRegisterInfo = reactive({
    account: loginConfig.value.account,
    password: loginConfig.value.password,
    identity: '',
    confirmPassword: '',
    email: '',
    verify: '',
  });

  const userAgreement = reactive({
    selected: false,
  });

  const { loading, setLoading } = useLoading();
  const handleSubmit = async ({ errors, values }) => {
    if (loading.value) return;

    if (!errors) {
      if (!isRegister.value) {
        setLoading(true);
        try {
          await userStore.login({
            account: values.account,
            password: values.password,
            identity: values.identity,
          });
          const { redirect, ...othersQuery } = router.currentRoute.value.query;
          router.push({
            name: redirect || 'myThesis',
            query: {
              ...othersQuery,
            },
          });
          Message.success('欢迎使用');
          const { rememberPassword } = loginConfig.value;
          const { account, password } = values;
          // 实际生产环境需要进行加密存储。
          // The actual production environment requires encrypted storage.
          loginConfig.value.account = rememberPassword ? account : '';
          loginConfig.value.password = rememberPassword ? password : '';
        } catch (err) {
          Message.error(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(true);
        try {
          if (userAndRegisterInfo.verify !== verifyImageStr.value) {
            Message.warning('验证码填写错误');
            await getVerifyImageInfo();
            return;
          }
          if (!userAgreement.selected) {
            Message.warning('请阅读用户协议');
            return;
          }
          await userStore.register({
            account: values.account,
            password: values.password,
            email: values.email,
          });
          Message.success('注册成功');
          isRegister.value = false;
          userAgreement.selected = false;
          userAndRegisterInfo.password = '';
          userAndRegisterInfo.confirmPassword = '';
          userAndRegisterInfo.identity = '';
          userAndRegisterInfo.email = '';
          userAndRegisterInfo.verify = '';
        } catch (err) {
          Message.error(err.message);
        } finally {
          setLoading(false);
        }
      }
    }
  };
</script>

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
        <TransitionGroup name="list" tag="div">
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
        </TransitionGroup>

        <a-space :size="16" direction="vertical">
          <div v-if="!isRegister" class="login-form-password-actions">
            <a-checkbox
              checked="rememberPassword"
              :model-value="loginConfig.rememberPassword"
              @change="
                (value) => {
                  loginConfig.rememberPassword = value;
                }
              "
            >
              {{ '记住密码' }}
            </a-checkbox>
            <a-link class="font">{{ '忘记密码' }}</a-link>
          </div>
          <a-button type="primary" html-type="submit" long>登录</a-button>
        </a-space>
        <div class="br"></div>
      </a-form>
    </div>
  </div>
</template>

<style lang="less">
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>

<style lang="less" scoped>
  .br {
    margin-bottom: 20px;
  }

  .box {
    width: 400px;
    height: 400%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 15px #05050547;
    border-radius: 20px 20px 20px 20px;
  }

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
