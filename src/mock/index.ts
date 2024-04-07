import Mock from 'mockjs';

import '@/views/login/mock';

import '@/views/thesis-manage/thesis-inquiry/mock';
import '@/views/thesis-manage/thesis-review/mock';

Mock.setup({
  timeout: '600-1000',
});
