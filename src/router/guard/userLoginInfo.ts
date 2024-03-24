import type { Router } from 'vue-router';

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // ...登录信息验证
  });
}
