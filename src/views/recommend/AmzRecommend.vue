<!--
 * @Author: simonyang
 * @Date: 2022-03-14 12:19:27
 * @LastEditTime: 2022-03-17 22:28:57
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="amz-recommend">
    <banner :images="images" />
    <recommend-new-songs :songs="newSongs"></recommend-new-songs>
    <recommend-song-list></recommend-song-list>
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
  Song
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
    newSongs: []
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
    async getPersonalizedNewSong() {
      const data = await getPersonalizedNewSong(12)
      console.log('新音乐', data)
      // 清空数组
      this.newSongs.splice(0)

      if (!data.result) {
        throw Error('请求数据失败')
      }

      // 提取歌曲信息
      for (const originSong of data.result.splice(-6)) {
        this.newSongs.push(new Song(originSong))
      }
      console.log(this.newSongs)
    },
    // 请求推荐歌单数据
    async getPersonalized() {
      const data = await getPersonalized()
      console.log('歌单', data)
    },
    // 请求推荐电台
    async getPersonalizedDJProgram() {
      const data = await getPersonalizedDJProgram()
      console.log('电台', data)
    }
  },
  created() {
    this.getBanner()
    this.getPersonalizedNewSong()
    // this.getPersonalized()
    // this.getPersonalizedDJProgram()
  }
}
</script>

<style scoped></style>
