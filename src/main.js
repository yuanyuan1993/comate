// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
import store from './store/store'

import axios from 'axios';
axios.defaults.baseURL="http://47.74.181.108:8080/";
//axios.defaults.baseURL="http://localhost:8080/";
Vue.prototype.axios = axios;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
