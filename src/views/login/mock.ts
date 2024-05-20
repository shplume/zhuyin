import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';
import { MockParams } from '@/types/mock';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

setupMock({
  setup() {
    // login
    Mock.mock(new RegExp('/api/v1/user/login'), (params: MockParams) => {
      window.console.log(params.body);

      const { account, password } = JSON.parse(params.body);
      if (!account) {
        return failResponseWrap(null, '用户名不能为空', 500);
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 500);
      }
      if (account === 'admin' && password === 'admin') {
        return successResponseWrap({
          token,
        });
      }
      return failResponseWrap(null, '账号或者密码错误', 500);
    });

    // register
    Mock.mock(new RegExp('/api/v1/user/register'), (params: MockParams) => {
      const { account, password, email } = JSON.parse(params.body);
      if (!account) {
        return failResponseWrap(null, '用户名不能为空', 500);
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 500);
      }
      if (!email) {
        return failResponseWrap(null, '邮箱不能为空', 500);
      }
      if (account === 'admin' && password === 'admin') {
        return successResponseWrap({});
      }
      return failResponseWrap(null, '注册账户失败', 500);
    });

    Mock.mock(new RegExp('/api/v1/user/logout'), () => {
      return successResponseWrap(null);
    });

    // user info
    Mock.mock(new RegExp('/api/v1/user/info'), () => {
      return successResponseWrap({
        userId: 0,
        account: 'admin',
        role: 'admin',
      });
    });
  },
});
