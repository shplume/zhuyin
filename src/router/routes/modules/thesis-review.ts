import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const THESISMANAGE: AppRouteRecordRaw = {
  path: '/thesisManage',
  name: 'thesisManage',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.thesisManage',
    icon: 'icon-archive',
    requiresAuth: true,
    order: 0,
  },
  children: [
    {
      path: 'thesisReview',
      name: 'thesisReview',
      component: () => import('@/views/thesis-manage/thesis-review/index.vue'),
      meta: {
        locale: 'menu.thesisManage.review',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default THESISMANAGE;
