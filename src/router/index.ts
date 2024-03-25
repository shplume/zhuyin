import { createRouter, createWebHistory } from 'vue-router';
import { appRoutes } from './routers';
import { NOT_FOUND_ROUTE } from './routers/base';
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
    ...appRoutes,
    NOT_FOUND_ROUTE
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

createRouteGuard(router);

export default router;
