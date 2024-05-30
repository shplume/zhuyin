import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginData,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userId: undefined,
    account: undefined,
    avatar: undefined,
    role: undefined,
    name: undefined,
    college: undefined,
    phone: undefined,
    number: undefined,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // Info - Get user's information
    async info() {
      const res = await getUserInfo();

      this.userId = res.data.userId;
      this.account = res.data.account;
      this.avatar = res.data.avatar;
      this.name = res.data.name;
      this.college = res.data.college;
      this.phone = res.data.phone;
      this.number = res.data.number;

      if ((res.data.role as number) === 1) {
        this.role = 'admin';
      }

      if ((res.data.role as number) === 2) {
        this.role = 'teacher';
      }

      if ((res.data.role as number) === 3) {
        this.role = 'student';
      }
    },

    // Info - Reset user's information
    resetInfo() {
      this.$reset();
    },

    switchRoles() {
      return new Promise((resolve) => {
        if (this.role === undefined) {
          this.role = 'admin';
        } else if (this.role === 'admin') {
          this.role = 'teacher';
        } else if (this.role === 'teacher') {
          this.role = 'student';
        } else if (this.role === 'student') {
          this.role = 'admin';
        }
        resolve(this.role);
      });
    },

    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
