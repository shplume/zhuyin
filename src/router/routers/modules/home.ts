import type { AppRouteRecordRaw } from '../types';

const About = { template: 'hello world' };

const HOME: AppRouteRecordRaw = {
  path: '/home',
  name: 'home',
  component: About
};

export default HOME;
