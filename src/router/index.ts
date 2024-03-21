import { createRouter, createWebHistory } from 'vue-router';

const Home = { template: '<div>Home</div>' };

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
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
