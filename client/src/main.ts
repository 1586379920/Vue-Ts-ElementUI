import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import './assets/css/global.css';

import moment from 'moment';
// 中文简体
moment.locale('zh-cn');
Vue.filter('dateformat', (dataStr: string, pattern = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(dataStr).format(pattern);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
