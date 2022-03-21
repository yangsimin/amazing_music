/*
 * @Author: simonyang
 * @Date: 2022-03-11 17:31:33
 * @LastEditTime: 2022-03-21 12:04:01
 * @LastEditors: simonyang
 * @Description:
 */
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/index.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
