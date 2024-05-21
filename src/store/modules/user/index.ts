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

    // Info - Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Info - Get user's information
    async info() {
      const res = await getUserInfo();

      this.setInfo(res.data);
    },

    // Info - Reset user's information
    resetInfo() {
      this.$reset();
    },

    switchRoles() {
      return new Promise((resolve) => {
        if (this.role === undefined) {
          this.role = 0;
        } else {
          this.role += 1 % 3;
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
