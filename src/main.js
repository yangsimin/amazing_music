/*
 * @Author: simonyang
 * @Date: 2022-03-11 17:31:33
 * @LastEditTime: 2022-03-17 17:55:18
 * @LastEditors: simonyang
 * @Description:
 */
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import './assets/css/index.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
