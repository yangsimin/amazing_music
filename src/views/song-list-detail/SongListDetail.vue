<!--
 * @Author: simonyang
 * @Date: 2022-03-28 11:41:37
 * @LastEditTime: 2022-03-29 19:47:02
 * @LastEditors: simonyang
 * @Description: 
 
-->
<template>
  <div class="song-list-detail flex">
    <div class="flex-1 min-w-[40rem] shadow-lg p-5 rounded-lg">
      <detail-info :info="info" @playAll="playAll"></detail-info>
      <detail-list
        class="mt-7"
        :songs="songs"
        v-amzLoading="isLoading"
      ></detail-list>
    </div>
    <div class="w-96 min-w-[20rem] ml-5">
      <card-view class="p-4">
        <template v-slot:title>
          <h3 class="pl-4 mb-5 border-l-4 border-red-600 font-bold text-xl">
            相关歌单推荐
          </h3>
        </template>
        <div
          class="flex text-sm mt-3 cursor-pointer media:hover:amz-text-hl"
          @click="jumpDetail(songList.id)"
          v-for="songList in relatedSongLists"
          :key="songList.id"
        >
          <img
            class="w-20 h-20 rounded-md"
            :src="getImageUrl(songList.coverImgUrl, 80, 80)"
          />
          <div class="flex flex-col justify-between ml-2">
            <h4 class="text-base font-bold amz-truncate-2">
              {{ songList.name }}
            </h4>
            <span class="text-gray-500">
              创建人:&nbsp;&nbsp;{{ songList.creator.nickname }}
            </span>
          </div>
        </div>
      </card-view>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DetailInfo from './cpns/DetailInfo.vue'
import DetailList from './cpns/DetailList.vue'
import CardView from '@/components/card-view'

import {
  getSongListDetail,
  getSongListTrack,
  getRelatedSongList
} from '@/api/common'
import { Song, SongListDetail } from '@/types/song/types'
import { formatImageUrl } from '@/utils/format'
import mixinLifeCycle from '@/utils/logger/life-cycle'
import Logger from '@/utils/logger'

const Log = Logger.create('SongListDetail')

export default {
  name: 'SongListDetail',
  mixins: [mixinLifeCycle()],
  components: {
    DetailInfo,
    DetailList,
    CardView
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
    // 相关歌单推荐
    relatedSongLists: [],
    isLoading: false
  }),
  methods: {
    ...mapActions(['insertSongs']),
    async requestDetailInfo() {
      let data = await getSongListDetail(this.$route.params.songListId)
      const songListInfo = new SongListDetail(data)
      Object.assign(this.info, songListInfo)
      Log.d(this.info)

      data = await getSongListTrack(this.$route.params.songListId)
      this.songs = data.songs.map(song => Song.createFromSongList(song))
      Log.d(this.songs)
      this.isLoading = false

      data = await getRelatedSongList(this.$route.params.songListId)
      this.relatedSongLists = data.playlists
      Log.d(this.relatedSongLists)
    },
    getImageUrl(url, width, height) {
      return formatImageUrl(url, width, height)
    },
    jumpDetail(id) {
      this.$router.push({
        name: 'song-list-detail',
        params: {
          songListId: id
        }
      })
      console.log(id)
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
          this.isLoading = true
          this.songs.splice(0)
          this.requestDetailInfo()
          document.body.scrollTo(0, 0)
        }
      },
      {
        immediate: true
      }
    )
  },
  activated() {}
}
</script>

<style scoped></style>
