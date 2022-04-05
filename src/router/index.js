/*
 * @Author: simonyang
 * @Date: 2022-03-14 12:12:41
 * @LastEditTime: 2022-04-05 17:39:16
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
    name: 'recommend',
    component: () => import('@/views/recommend/AmzRecommend.vue')
  },
  {
    path: '/song-list',
    name: 'song-list',
    component: () => import('@/views/song-list/SongList.vue')
  },
  {
    path: '/top-list',
    name: 'top-list',
    component: () => import('@/views/top-list/TopList.vue')
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('@/views/singer/Singer.vue')
  },
  {
    path: '/song-list-detail/:songListId',
    name: 'song-list-detail',
    component: () => import('@/views/song-list-detail/SongListDetail.vue')
  },
  {
    path: '/singer-detail/:singerId',
    name: 'singer-detail',
    component: () => import('@/views/singer-detail/SingerDetail.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/Search.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/NotFound.vue')
  }
]

const router = new VueRouter({
  routes
})
export default router
