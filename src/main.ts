import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import store from './store';
import '@arco-design/web-vue/dist/arco.css';
import '@/api/interceptor';
// import './assets/main.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(store);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.use(router);

app.mount('#app');
