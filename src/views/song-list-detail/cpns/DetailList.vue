<!--
 * @Author: simonyang
 * @Date: 2022-03-28 15:27:25
 * @LastEditTime: 2022-03-28 22:57:53
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="detail-list">
    <div class="flex items-center h-14 text-gray-400 even:bg-gray-100">
      <span class="w-16 text-center">序号</span>
      <span class="flex items-center w-[35%] flex-1">歌曲</span>
      <span class="w-[25%] flex-shrink">歌手</span>
      <span class="w-[20%] flex-shrink">专辑</span>
      <span class="w-20">时长</span>
    </div>
    <div
      class="group flex items-center h-14 text-left media:hover:bg-gray-hl even:bg-gray-100"
      v-for="(song, index) in songs"
      :key="song.id"
    >
      <div class="relative w-16 text-center cursor-pointer">
        <span class="group-hover:hidden">{{ index + 1 }}</span>
        <i
          class="hidden iconfont icon-play-music text-red-500 before:text-3xl group-hover:block"
          @click="playMusic(index)"
        ></i>
      </div>

      <div class="flex items-center w-[35%] flex-1 cursor-pointer">
        <img class="w-10 rounded-md" :src="song.picUrl" />
        <span class="ml-2 truncate">{{ song.songName }}</span>
      </div>
      <span class="w-[25%] flex-shrink truncate">{{
        getArtists(song.artists)
      }}</span>
      <span class="w-[20%] flex-shrink truncate">{{ song.album.name }}</span>
      <span class="w-20">{{ getSongTime(song.duration) }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { formatImageUrl, formatSongTime } from '@/utils/format'
export default {
  name: 'DetailList',
  props: {
    songs: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions(['insertSongs']),
    getImageUrl(url, width, height) {
      return formatImageUrl(url, width, height)
    },
    getArtists(artists) {
      return artists.map(artist => artist.name).join(' / ')
    },
    getSongTime(duration) {
      return formatSongTime(duration)
    },
    playMusic(index) {
      this.insertSongs([this.songs[index]])
    }
  }
}
</script>

<style scoped></style>
