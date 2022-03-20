/*
 * @Author: simonyang
 * @Date: 2022-03-11 17:31:33
 * @LastEditTime: 2022-03-19 11:16:35
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

import { getSongUrl } from '@/api'
getSongUrl(33894312).then(res => {
  console.log(res)
})
