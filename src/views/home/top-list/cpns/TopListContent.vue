<!--
 * @Author: simonyang
 * @Date: 2022-03-31 09:30:12
 * @LastEditTime: 2022-04-05 11:00:54
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <section class="top-list-content">
    <content-info :list-info="listInfo" @play-all="playAll"></content-info>
    <song-list-table
      class="mt-7"
      :songs="songs"
      v-amzLoading="isLoading"
    ></song-list-table>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SongListTable from '@/components/song-list-table'
import ContentInfo from './ContentInfo.vue'

import Logger from '@/utils/logger'
import { getSongListTrack } from '@/api'
import { Song } from '@/types/song/types'
import lifeCycle from '@/mixins/life-cycle'
const Log = Logger.create('TopListContent')

export default {
  name: 'TopListContent',
  mixins: [lifeCycle()],
  components: {
    SongListTable,
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
