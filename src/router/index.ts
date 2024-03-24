import { createRouter, createWebHistory } from 'vue-router';
import { appRoutes } from './routers';

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

export default router;
