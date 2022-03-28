<!--
 * @Author: simonyang
 * @Date: 2022-03-28 11:41:37
 * @LastEditTime: 2022-03-28 16:26:55
 * @LastEditors: simonyang
 * @Description: 
 
-->
<template>
  <div class="song-list-detail p-3">
    <detail-info :info="info"></detail-info>
    <detail-list></detail-list>
  </div>
</template>

<script>
import DetailInfo from './cpns/DetailInfo.vue'
import DetailList from './cpns/DetailList.vue'

import { getSongListDetail, getSongListTrack } from '@/api/common'
import { Song } from '@/types/song/types'
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
      creator: {}
    },
    songs: []
  }),
  methods: {
    requestDetailInfo() {
      getSongListDetail(this.$route.params.songListId).then(data => {
        console.log(data)
        const songListInfo = {
          name: data.playlist.name,
          coverImgUrl: data.playlist.coverImgUrl,
          createTime: data.playlist.createTime,
          description: data.playlist.description,
          tags: data.playlist.tags,
          trackCount: data.playlist.trackCount,
          playCount: data.playlist.playCount,
          trackUpdateTime: data.playlist.trackUpdateTime,
          creator: {
            nickname: data.playlist.creator.nickname,
            avatarUrl: data.playlist.creator.avatarUrl,
            userId: data.playlist.creator.userId
          }
        }
        Object.assign(this.info, songListInfo)
        console.log(this.info)
      })

      getSongListTrack(this.$route.params.songListId).then(data => {
        this.songs = data.songs.map(song => Song.createFromSongList(song))
      })
    }
  }
}
</script>

<style scoped></style>
