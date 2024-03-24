import { createRouter, createWebHistory } from 'vue-router';
import { appRoutes } from './routers';
import createRouteGuard from './guard';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    ...appRoutes
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

createRouteGuard(router);

export default router;
