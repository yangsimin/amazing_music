/*
 * @Author: simonyang
 * @Date: 2022-03-11 17:31:33
 * @LastEditTime: 2022-03-29 16:22:32
 * @LastEditors: simonyang
 * @Description:
 */
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import './assets/css/index.css'
import DirectiveLoading from '@/directives/amz-loading'

Vue.config.productionTip = false
Vue.use(DirectiveLoading)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

setupStore()
