import type { AppRouteRecordRaw } from '../types';

const HOME: AppRouteRecordRaw = {
  path: '/home',
  name: 'home',
  component: () => import('@/views/home/index.vue')
};

export default HOME;
