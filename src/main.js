/*
 * @Author: simonyang
 * @Date: 2022-03-11 17:31:33
 * @LastEditTime: 2022-03-14 20:47:46
 * @LastEditors: simonyang
 * @Description:
 */
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import './assets/css/index.css'
import * as requestApi from '@/api'

Vue.config.productionTip = false
Vue.prototype.$api = requestApi

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
