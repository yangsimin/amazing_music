<!--
 * @Author: simonyang
 * @Date: 2022-03-14 12:19:27
 * @LastEditTime: 2022-03-18 21:58:57
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="amz-recommend">
    <banner :images="images" />
    <recommend-new-songs :songs="newSongs"></recommend-new-songs>
    <recommend-song-list :song-lists="songLists"></recommend-song-list>
  </div>
</template>

<script>
import Banner from './cpns/Banner.vue'
import RecommendNewSongs from './cpns/RecommendNewSongs.vue'
import RecommendSongList from './cpns/RecommendSongList.vue'

import {
  getBanner,
  getPersonalized,
  getPersonalizedNewSong,
  getPersonalizedDJProgram,
  Song,
  SongList
} from '@/api'

export default {
  name: 'AmzRecommend',
  components: {
    Banner,
    RecommendNewSongs,
    RecommendSongList
  },
  data: () => ({
    images: [],
    newSongs: [],
    songLists: []
  }),
  methods: {
    // 请求 Banner 数据
    async getBanner() {
      const data = await getBanner()
      const images = data.banners.map(banner => banner.imageUrl)
      // 布局限制, 只去前三张图
      images.splice(3)
      this.images.push(...images)
    },
    // 请求推荐新音乐
    async getPersonalizedNewSong(limit) {
      const data = await getPersonalizedNewSong(limit)
      // 清空数组
      this.newSongs.splice(0)

      if (!data.result) {
        throw Error('请求数据失败')
      }

      // 提取歌曲信息
      for (const originSong of data.result) {
        this.newSongs.push(new Song(originSong))
      }
    },
    // 请求推荐歌单数据
    async getPersonalized(limit) {
      const data = await getPersonalized(limit)
      console.log('歌单', data)
      for (const originSongList of data.result) {
        this.songLists.push(new SongList(originSongList))
      }
    },
    // 请求推荐电台
    async getPersonalizedDJProgram() {
      const data = await getPersonalizedDJProgram()
      console.log('电台', data)
    }
  },
  created() {
    this.getBanner()
    this.getPersonalizedNewSong(6)
    this.getPersonalized(12)
    // this.getPersonalizedDJProgram()
  }
}
</script>

<style scoped></style>
