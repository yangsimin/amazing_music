/*
 * @Author: simonyang
 * @Date: 2022-03-11 17:31:33
 * @LastEditTime: 2022-04-06 13:40:53
 * @LastEditors: simonyang
 * @Description:
 */
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import './assets/css/index.css'
import { registerPlugin } from '@/global'

Vue.config.productionTip = false
registerPlugin(Vue)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

setupStore()
