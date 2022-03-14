/*
 * @Author: simonyang
 * @Date: 2022-03-14 12:12:41
 * @LastEditTime: 2022-03-14 17:54:21
 * @LastEditors: simonyang
 * @Description:
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

// 注册插件
Vue.use(VueRouter)

// 建立 route 映射关系
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: () => import('@/views/recommend/AmzRecommend.vue')
  },
  {
    path: '/song-list',
    component: () => import('@/views/song-list/SongList.vue')
  },
  {
    path: '/top-list',
    component: () => import('@/views/top-list/TopList.vue')
  }
]

const router = new VueRouter({
  routes
})
export default router
