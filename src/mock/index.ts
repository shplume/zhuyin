import Mock from 'mockjs';

import '@/views/login/mock';

import '@/views/my-thesis/thesis-upload/mock';
import '@/views/thesis-manage/thesis-inquiry/mock';
import '@/views/thesis-manage/thesis-review/mock';

import '@/views/user/setting/mock';
import '@/views/user/info/mock';

Mock.setup({
  timeout: '600-1000',
});
