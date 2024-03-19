import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
  type MockParams
} from '@/mock/setup-mock';

setupMock({
  setup() {
    // 登录
    Mock.mock(new RegExp('/api/v1/user/login'), (params: MockParams) => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const { account, password } = JSON.parse(params.body);
      if (!account) {
        return failResponseWrap(null, '用户名不能为空', 500);
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 500);
      }
      if (account === 'admin' && password === 'admin') {
        window.localStorage.setItem('userRole', 'admin');
        return successResponseWrap({
          token
        });
      }
      if (account === 'user' && password === 'user') {
        window.localStorage.setItem('userRole', 'user');
        return successResponseWrap({
          token
        });
      }
      return failResponseWrap(null, '账号或者密码错误', 500);
    });
  }
});
