<!--
 * @Author: simonyang
 * @Date: 2022-03-14 12:19:27
 * @LastEditTime: 2022-04-11 10:47:21
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="amz-recommend">
    <banner :banners="banners" />
    <recommend-new-songs :songs="newSongs"></recommend-new-songs>
    <recommend-song-list :song-lists="songLists"></recommend-song-list>
  </div>
</template>

<script>
import Banner from './cpns/Banner.vue'
import RecommendNewSongs from './cpns/RecommendNewSongs.vue'
import RecommendSongList from './cpns/RecommendSongList.vue'
import mixinLifeCycle from '@/mixins/life-cycle'
import restoreScroll from '@/mixins/restore-scroll'
import Logger from '@/utils/logger'

import {
  getBanner,
  getPersonalized,
  getPersonalizedNewSong,
  getPersonalizedDJProgram
} from '@/api'
import { Song, SongList } from '@/types/song/types'

// eslint-disable-next-line no-unused-vars
const Log = Logger.create('AmzRecommend')

export default {
  name: 'AmzRecommend',
  mixins: [mixinLifeCycle(false), restoreScroll],
  components: {
    Banner,
    RecommendNewSongs,
    RecommendSongList
  },
  data: () => ({
    banners: [],
    newSongs: [],
    songLists: []
  }),
  methods: {
    // 请求 Banner 数据
    async getBanner() {
      const data = await getBanner()
      // 布局限制, 只取前三张图
      this.banners.push(
        ...data.banners
          .map(banner => ({
            id: banner.targetId,
            type: banner.typeTitle,
            imageUrl: banner.imageUrl
          }))
          .slice(0, 3)
      )
    },
    // 请求推荐新音乐
    async getPersonalizedNewSong(limit) {
      const data = await getPersonalizedNewSong(limit)
      // 清空数组
      this.newSongs.splice(0)
      Log.d(data)
      if (!data.result) {
        throw Error('请求数据失败')
      }
      // 提取歌曲信息
      for (const originSong of data.result) {
        this.newSongs.push(Song.createFromNewSong(originSong))
      }
    },
    // 请求推荐歌单数据
    async getPersonalized(limit) {
      const data = await getPersonalized(limit)

      if (!data.result) {
        throw Error('请求数据失败')
      }

      for (const originSongList of data.result) {
        this.songLists.push(new SongList(originSongList))
      }
    },
    // 请求推荐电台
    async getPersonalizedDJProgram() {
      const data = await getPersonalizedDJProgram()

      if (!data.result) {
        throw Error('请求数据失败')
      }
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
