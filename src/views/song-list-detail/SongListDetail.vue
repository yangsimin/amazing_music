<!--
 * @Author: simonyang
 * @Date: 2022-03-28 11:41:37
 * @LastEditTime: 2022-03-28 21:08:42
 * @LastEditors: simonyang
 * @Description: 
 
-->
<template>
  <div class="song-list-detail p-3">
    <detail-info class="max-w-3xl" :info="info"></detail-info>
    <detail-list class="max-w-3xl" :songs="songs"></detail-list>
  </div>
</template>

<script>
import DetailInfo from './cpns/DetailInfo.vue'
import DetailList from './cpns/DetailList.vue'

import { getSongListDetail, getSongListTrack } from '@/api/common'
import { Song, SongListDetail } from '@/types/song/types'
import mixinLifeCycle from '@/utils/logger/life-cycle'

export default {
  name: 'SongListDetail',
  mixins: [mixinLifeCycle('SongListDetail')],
  components: {
    DetailInfo,
    DetailList
  },
  created() {
    this.requestDetailInfo()
  },
  data: () => ({
    info: {
      name: '',
      coverImgUrl: '',
      createTime: 0,
      description: '',
      tags: [],
      trackCount: 0,
      playCount: 0,
      trackUpdateTime: 0,
      creator: {}
    },
    songs: []
  }),
  methods: {
    requestDetailInfo() {
      getSongListDetail(this.$route.params.songListId).then(data => {
        const songListInfo = new SongListDetail(data)
        Object.assign(this.info, songListInfo)
        console.log(this.info)
      })

      getSongListTrack(this.$route.params.songListId).then(data => {
        this.songs = data.songs.map(song => Song.createFromSongList(song))
        console.log(this.songs)
      })
    }
  }
}
</script>

<style scoped></style>
