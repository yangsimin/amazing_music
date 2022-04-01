<!--
 * @Author: simonyang
 * @Date: 2022-03-31 09:30:12
 * @LastEditTime: 2022-03-31 16:02:58
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <section class="top-list-content">
    <content-info :list-info="listInfo" @play-all="playAll"></content-info>
    <detail-list
      class="mt-7"
      :songs="songs"
      v-amzLoading="isLoading"
    ></detail-list>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DetailList from '@/components/detail-list'
import ContentInfo from './ContentInfo.vue'

import Logger from '@/utils/logger'
import { getSongListTrack } from '@/api/common'
import { Song } from '@/types/song/types'
import { formatImageUrl } from '@/utils/format'

const Log = Logger.create('TopListContent')

export default {
  name: 'TopListContent',
  components: {
    DetailList,
    ContentInfo
  },
  data: () => ({
    songs: [],
    isLoading: false
  }),
  computed: {
    ...mapState('topList', ['activeId', 'listInfo'])
  },
  methods: {
    ...mapActions(['insertSongs']),
    async requestDetailInfo() {
      this.isLoading = true
      Log.d('begin request')
      let data = await getSongListTrack(this.activeId)
      Log.d('end request', data)
      this.songs = data.songs.map(song => Song.createFromSongList(song))
      this.isLoading = false
    },
    getImageUrl(url, width, height) {
      return formatImageUrl(url, width, height)
    },
    playAll() {
      console.log('playALl')
      this.insertSongs(this.songs)
    }
  },
  watch: {
    activeId(id) {
      if (!id) {
        return
      }
      this.requestDetailInfo()
    }
  }
}
</script>

<style scoped></style>
