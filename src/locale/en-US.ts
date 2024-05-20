import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localeThesisState from '@/views/my-thesis/thesis-state/locale/en-US';
import localeThesisUpload from '@/views/my-thesis/thesis-upload/locale/en-US';

import localeThesisInquiry from '@/views/thesis-manage/thesis-inquiry/locale/en-US';
import localeThesisReview from '@/views/thesis-manage/thesis-review/locale/en-US';
import localeThesisView from '@/views/thesis-manage/thesis-view/locale/en-US';

import localeUserSetting from '@/views/user/setting/locale/en-US';
import localeUserInfo from '@/views/user/info/locale/en-US';

import localeSettings from './en-US/settings';

export default {
  'menu.myThesis': 'my thesis',
  'menu.thesisManage': 'thesis manage',
  'menu.user': 'personal center',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeThesisState,
  ...localeThesisUpload,
  ...localeThesisInquiry,
  ...localeThesisView,
  ...localeThesisReview,
  ...localeUserSetting,
  ...localeUserInfo,
};
