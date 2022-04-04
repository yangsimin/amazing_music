<!--
 * @Author: simonyang
 * @Date: 2022-04-02 16:27:41
 * @LastEditTime: 2022-04-04 18:06:40
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="singer-detail">
    <singer-detail-header class="mt-5" :singer="singer"></singer-detail-header>
    <nav-header
      class="mt-5"
      :titles="titles"
      :activeIndex="activeIndex"
      @titleClick="titleClick"
    >
      <template v-slot="{ title }">
        <span class="block w-20 mx-3 py-1 text-lg text-center">
          {{ title }}
        </span>
      </template>
    </nav-header>
    <component
      :is="currentComponent"
      :hotSongs="songs"
      :id="$route.params.singerId"
    ></component>
  </div>
</template>

<script>
import SingerDetailHeader from './cpns/SingerDetailHeader.vue'
import NavHeader from '@/components/nav-header'
import DetailHotSong from './cpns/DetailHotSong.vue'
import DetailAlbum from './cpns/DetailAlbum.vue'
import DetailSingerDesc from './cpns/DetailSingerDesc.vue'
import DetailSimilarSinger from './cpns/DetailSimilarSinger.vue'

import { getArtists } from '@/api'
import { Singer, Song } from '@/types/song/types'
import Logger from '@/utils/logger'

const Log = Logger.create('SingerDetail')

export default {
  name: 'SingerDetail',
  components: {
    SingerDetailHeader,
    NavHeader,
    DetailHotSong,
    DetailAlbum,
    DetailSingerDesc,
    DetailSimilarSinger
  },
  data: () => ({
    singer: {},
    hotSongs: [],
    tabs: [
      { title: '热门歌曲', component: 'DetailHotSong' },
      { title: '专辑', component: 'DetailAlbum' },
      { title: '歌手详情', component: 'DetailSingerDesc' },
      { title: '相似歌手', component: 'DetailSimilarSinger' }
    ],
    activeIndex: -1
  }),
  computed: {
    titles() {
      return this.tabs.map(tab => tab.title)
    },
    currentComponent() {
      return this.activeIndex >= 0
        ? this.tabs[this.activeIndex].component
        : undefined
    },
    songs() {
      return this.activeIndex === 0 ? this.hotSongs : undefined
    }
  },
  methods: {
    async requestArtists() {
      const data = await getArtists(this.$route.params.singerId)
      Log.d(data)
      this.singer = new Singer(data.artist)
      this.hotSongs.push(
        ...data.hotSongs.map(song => Song.createFromSongList(song))
      )
      this.activeIndex = 0
    },
    titleClick(index) {
      this.activeIndex = index
    }
  },
  created() {
    this.requestArtists()
  }
}
</script>

<style scoped></style>
