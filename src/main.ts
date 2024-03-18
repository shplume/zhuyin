import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import './assets/main.css';
import '@/api/interceptor';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.use(router);

app.mount('#app');