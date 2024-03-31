import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localeThesisState from '@/views/my-thesis/thesis-state/locale/en-US';
import localeThesisUpload from '@/views/my-thesis/thesis-upload/locale/en-US';

import localeSettings from './en-US/settings';

export default {
  'menu.myThesis': 'my thesis',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeThesisState,
  ...localeThesisUpload,
};
