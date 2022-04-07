<!--
 * @Author: simonyang
 * @Date: 2022-04-02 16:27:41
 * @LastEditTime: 2022-04-07 15:39:22
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="singer-detail min-w-[1024px]">
    <singer-detail-header
      class="mt-5"
      :singer="singer"
      @playHotSongs="playHotSongs"
    ></singer-detail-header>
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
      class="mt-5"
      :is="currentComponent"
      :hotSongs="songs"
      :id="Number($route.params.singerId)"
    ></component>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SingerDetailHeader from './cpns/SingerDetailHeader.vue'
import NavHeader from '@/components/nav-header'
import DetailHotSong from './cpns/DetailHotSong.vue'
import DetailAlbum from './cpns/DetailAlbum.vue'
import DetailSingerDesc from './cpns/DetailSingerDesc.vue'
import DetailSimilarSinger from './cpns/DetailSimilarSinger.vue'

import { getArtists } from '@/api'
import { Singer, Song } from '@/types/song/types'
import Logger from '@/utils/logger'
import restoreScroll from '@/mixins/restore-scroll'
import lifeCycle from '@/mixins/life-cycle'

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
  mixins: [restoreScroll, lifeCycle()],
  data: () => ({
    singer: {},
    hotSongs: [],
    tabs: [
      { title: '热门歌曲', component: 'DetailHotSong' },
      { title: '专辑', component: 'DetailAlbum' },
      { title: '歌手详情', component: 'DetailSingerDesc' },
      { title: '相似歌手', component: 'DetailSimilarSinger' }
    ],
    activeIndex: -1,
    history: {
      id: -1,
      index: -1
    }
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
    ...mapActions(['insertSongs']),
    async requestArtists() {
      Log.d('request', this.$route.params.singerId)
      const data = await getArtists(this.$route.params.singerId)
      Log.d(data)
      this.singer = new Singer(data.artist)
      this.hotSongs.push(
        ...data.hotSongs.map(song => Song.createFromSongList(song))
      )
    },
    titleClick(index) {
      this.activeIndex = index
    },
    playHotSongs() {
      this.insertSongs(this.hotSongs)
    }
  },
  created() {
    this.$watch(
      () => this.$route.params.singerId,
      id => {
        if (id) {
          Log.d('watch', id)
          this.requestArtists()
          this.singer = {}
          this.hotSongs.splice(0)
          this.activeIndex = 0
        }
      },
      {
        immediate: true
      }
    )
  },
  activated() {
    if (this.$route.params.singerId === this.history.id) {
      this.activeIndex = this.history.index
    }
  },
  beforeRouteLeave(to, from, next) {
    this.history.id = this.$route.params.singerId
    this.history.index = this.activeIndex
    next()
  }
}
</script>

<style scoped></style>
