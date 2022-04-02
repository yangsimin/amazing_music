/*
 * @Author: simonyang
 * @Date: 2022-03-11 17:31:33
 * @LastEditTime: 2022-04-02 11:21:06
 * @LastEditors: simonyang
 * @Description:
 */
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import './assets/css/index.css'
import loading from '@/directives/amz-loading'
import InfiniteScroll from '@/directives/infinite-scroll'
import AmzImage from '@/base-ui/amz-image'

Vue.config.productionTip = false
Vue.use(loading)
Vue.use(AmzImage)
Vue.use(InfiniteScroll)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

setupStore()
