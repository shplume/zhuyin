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
    order: 1,
    roles: ['admin', 'teacher'],
  },
  children: [
    {
      path: 'thesisInquiry',
      name: 'thesisInquiry',
      component: () => import('@/views/thesis-manage/thesis-inquiry/index.vue'),
      meta: {
        locale: 'menu.thesisManage.inquiry',
        requiresAuth: true,
        roles: ['*'],
      },
    },
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
    {
      path: 'thesisView',
      name: 'thesisView',
      component: () => import('@/views/thesis-manage/thesis-view/index.vue'),
      meta: {
        locale: '评阅界面',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default THESISMANAGE;
