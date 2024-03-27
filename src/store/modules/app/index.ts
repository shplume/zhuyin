import { defineStore } from 'pinia';
import type { AppState } from './types';

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    theme: 'light',
    colorWeak: false,
    navbar: true,
    menu: true,
    topMenu: false,
    hideMenu: false,
    menuCollapse: false,
    footer: true,
    themeColor: '#165DFF',
    menuWidth: 220,
    globalSettings: false,
    device: 'desktop',
    tabBar: false,
    menuFromServer: false,
    serverMenu: []
  }),

  getters: {},

  actions: {
    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        this.theme = 'light';
        document.body.removeAttribute('arco-theme');
      }
    }
  }
});

export default useAppStore;
