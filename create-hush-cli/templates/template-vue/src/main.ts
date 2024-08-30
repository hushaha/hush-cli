import '@/assets/styles/index.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { router } from '@/routers';

import App from './App.vue';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);

app.use(router);

app.mount('#app');
