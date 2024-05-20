import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const MYTHESIS: AppRouteRecordRaw = {
  path: '/myThesis',
  name: 'myThesis',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.myThesis',
    icon: 'icon-bookmark',
    requiresAuth: true,
    order: 0,
  },
  children: [
    {
      path: 'thesisUpload',
      name: 'thesisUpload',
      component: () => import('@/views/my-thesis/thesis-upload/index.vue'),
      meta: {
        locale: 'menu.myThesis.upload',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'thesisState',
      name: 'thesisState',
      component: () => import('@/views/my-thesis/thesis-state/index.vue'),
      meta: {
        locale: 'menu.myThesis.state',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default MYTHESIS;
