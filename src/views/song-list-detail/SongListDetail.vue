<!--
 * @Author: simonyang
 * @Date: 2022-03-28 11:41:37
 * @LastEditTime: 2022-04-06 13:50:35
 * @LastEditors: simonyang
 * @Description: 
 
-->
<template>
  <div class="song-list-detail flex">
    <div class="flex-1 min-w-[40rem] shadow-lg p-5 rounded-lg">
      <list-detail-header :info="info" @playAll="playAll"></list-detail-header>
      <song-list-table
        class="mt-7"
        :songs="songs"
        v-amzLoading="isLoading"
      ></song-list-table>
    </div>
    <div class="w-96 min-w-[20rem] ml-5">
      <recommend-card :songListId="songListId"></recommend-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ListDetailHeader from './cpns/ListDetailHeader.vue'
import SongListTable from '@/components/song-list-table'
import RecommendCard from './cpns/RecommendCard.vue'

import { getSongListDetail, getSongListTrack } from '@/api'
import { Song, SongListDetail } from '@/types/song/types'
import mixinLifeCycle from '@/mixins/life-cycle'
import Logger from '@/utils/logger'

const Log = Logger.create('SongListDetail', false)

export default {
  name: 'SongListDetail',
  mixins: [mixinLifeCycle()],
  components: {
    ListDetailHeader,
    SongListTable,
    RecommendCard
  },

  data: () => ({
    // 歌单简介
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
    // 歌单包含的歌曲
    songs: [],
    isLoading: false
  }),
  computed: {
    songListId() {
      return Number.parseInt(this.$route.params.songListId)
    }
  },
  methods: {
    ...mapActions(['insertSongs']),
    async requestDetailInfo() {
      this.isLoading = true
      let data = await getSongListDetail(this.songListId)
      const songListInfo = new SongListDetail(data)
      Object.assign(this.info, songListInfo)
      Log.d(this.info)

      data = await getSongListTrack(this.songListId)
      this.songs = data.songs.map(song => Song.createFromSongList(song))
      Log.d(this.songs)
      this.isLoading = false
    },
    playAll() {
      this.insertSongs(this.songs)
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      params => {
        if (params.songListId) {
          Log.d('request', params)

          this.songs.splice(0)
          this.requestDetailInfo()
          document.body.scrollTo(0, 0)
        }
      },
      {
        immediate: true
      }
    )
  }
}
</script>

<style scoped></style>
