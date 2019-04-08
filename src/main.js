// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './style/reset.css';
import Vue from 'vue';

import VueRouter from 'vue-router';
import App from './App';
import routes from './router';

// store为实例化生成的
import store from './store';

import Config from './config/index';

import Sto from 'store';

import axios from "axios";

// import { Message, loading } from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter);
Vue.use(ElementUI);

Vue.prototype.$axios = axios;
Vue.prototype.$loading = ElementUI.Loading;
Vue.prototype.$message = ElementUI.Message;
Vue.prototype.$sto = Sto;
Vue.prototype.$conf = Config;

Vue.config.productionTip = false

// 创建路由实例
const router = new VueRouter({
  routes: routes,
  mode: 'history',
  strict: process.env.NODE_ENV === 'development' // 生产环境使用严格模式
})

router.beforeEach((to, from, next) => {
  let cookies = Sto.get(Config.constant.cookie);
  if ((!cookies || !cookies.token) && to.path != Config.route.login) {
    next(Config.route.login);
  } else if (cookies && cookies.token && to.path != Config.route.login) {
    let token = cookies.token;
    // 保存2个小时TOKEN
    if ((new Date()).getTime() - token > 7200000) {
      delete cookies.token;
      Sto.set(Config.constant.cookie, cookies);
      next(Config.route.login);
    } else {
      next();
    }
  } else {
    next();
  }
})

// router.afterEach((transition) => {
// })

window.$config = {};

if (window.location.hostname === 'localhost' && window.location.port === "8080") {
  window.$config.HOST = 'http://localhost:8080';
} else if (window.location.hostname === 'localhost' && window.location.port === "8081") {
  window.$config.HOST = 'http://localhost:8001';
  // window.$config.HOST = 'http://202.120.1.66:8001'
} else if (window.location.hostname === '202.120.1.66' && window.location.port === '8001') {
  window.$config.HOST = 'http://202.120.1.66:8001'
} else {
  window.$config.HOST = 'http://localhost:3000';
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
