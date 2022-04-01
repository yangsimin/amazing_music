/*
 * @Author: simonyang
 * @Date: 2022-03-11 17:31:33
 * @LastEditTime: 2022-03-31 20:51:17
 * @LastEditors: simonyang
 * @Description:
 */
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import './assets/css/index.css'
import DirectiveLoading from '@/directives/amz-loading'
import AmzImage from '@/base-ui/amz-image'

Vue.config.productionTip = false
Vue.use(DirectiveLoading)
Vue.use(AmzImage)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

setupStore()
