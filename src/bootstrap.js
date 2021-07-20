import 'Public/favicon.ico';
import 'Styles/main.less';
import httpSettings from 'Config/http';
import http from 'Utils/http';
import { createApp } from 'vue';
import store from './store';
import router from './router';
import App from './App.vue';

// 设置http请求的默认参数
http.settings(httpSettings);

createApp(App).use(store).use(router).mount('#app');