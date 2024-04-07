import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeThesisState from '@/views/my-thesis/thesis-state/locale/zh-CN';
import localeThesisUpload from '@/views/my-thesis/thesis-upload/locale/zh-CN';

import localeThesisInquiry from '@/views/thesis-manage/thesis-inquiry/locale/zh-CN';
import localeThesisReview from '@/views/thesis-manage/thesis-review/locale/zh-CN';

import localeUserSetting from '@/views/user/setting/locale/zh-CN';

import localeSettings from './zh-CN/settings';

export default {
  'menu.myThesis': '我的论文',
  'menu.thesisManage': '论文管理',
  'menu.user': '个人中心',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeThesisState,
  ...localeThesisUpload,
  ...localeThesisInquiry,
  ...localeThesisReview,
  ...localeUserSetting,
};
