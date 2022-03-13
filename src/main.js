/*
 * @Author: simonyang
 * @Date: 2022-03-11 17:31:33
 * @LastEditTime: 2022-03-13 20:13:53
 * @LastEditors: simonyang
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'

import './assets/css/index.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
