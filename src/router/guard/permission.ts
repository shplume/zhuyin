import type { Router } from 'vue-router';

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // ...权限控制
  });
}
