<!--
 * @Author: simonyang
 * @Date: 2022-03-14 12:19:34
 * @LastEditTime: 2022-03-29 22:58:15
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="song-list">
    <div class="flex items-center">
      <h3 class="font-bold text-lg">所有</h3>
      <span>全部歌单</span>
    </div>
    <div class="flex" v-for="(category, index) in categories" :key="category">
      <h3 class="w-12 font-bold text-lg">{{ category }}</h3>
      <div class="flex flex-wrap">
        <span
          class="mr-2 px-2 py-1 text-gray-600 border-2 rounded-full cursor-pointer"
          v-for="tag in filterSongList(index)"
          :key="tag.name"
        >
          {{ tag.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getCateList, getTopList } from '@/api/song-list'
import Logger from '@/utils/logger'

const Log = Logger.create('SongList')

export default {
  name: 'SongList',
  data: () => ({
    curCate: '',
    // 类型大类
    categories: [],
    // 所有小类, {name, category, hot}
    allCateList: [],
    // 小类对应的当前页歌单
    songLists: [],
    pageInfo: {
      offset: 0,
      limit: 0,
      total: 0,
      sumPage: 0
    }
  }),
  methods: {
    async requestCateList() {
      let data = await getCateList()
      Log.i('requestCateList', data)
      this.categories = []
      for (const key in data.categories) {
        this.categories[key] = data.categories[key]
      }
      this.allCateList = data.sub.map(each => ({
        name: each.name,
        category: each.category,
        hot: each.hot
      }))
    },
    async requestSongLists(cate) {
      let data = await getTopList(cate, 40, 0)
      Log.i(data)
    },
    filterSongList(category) {
      return this.allCateList.filter(cate => cate.category === category)
    }
  },
  created() {
    this.requestCateList()
    // this.requestSongLists('安静')
  }
}
</script>

<style scoped></style>
