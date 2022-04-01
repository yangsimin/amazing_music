<!--
 * @Author: simonyang
 * @Date: 2022-03-28 15:27:25
 * @LastEditTime: 2022-04-01 10:36:51
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="detail-list">
    <div class="flex items-center h-14 text-gray-400 bg-gray-100">
      <span class="w-16 text-center">序号</span>
      <span class="flex items-center w-[30%] flex-auto">歌曲</span>
      <span class="w-[30%] flex-shrink flex-auto">歌手</span>
      <span class="w-[22%] flex-shrink">专辑</span>
      <span class="w-20">时长</span>
    </div>
    <div
      class="group flex items-center h-14 text-left media:hover:bg-gray-hl odd:bg-gray-100"
      :class="{ 'amz-text-hl': song.id === playingSong.id }"
      v-for="(song, index) in songs"
      :key="song.id"
    >
      <playing-icon
        class="scale-[0.4]"
        v-if="song.id === playingSong.id"
      ></playing-icon>
      <!-- 序号 -->
      <div class="relative w-16 text-center cursor-pointer" v-else>
        <span class="group-hover:hidden">{{ index + 1 }}</span>
        <i
          class="hidden iconfont icon-play-music text-red-500 before:text-3xl group-hover:block"
          @click="playMusic(index)"
        ></i>
      </div>
      <!-- 歌曲 -->
      <div class="flex items-center w-[30%] flex-auto cursor-pointer">
        <amz-image
          class="w-10 rounded-md overflow-hidden"
          :src="getImageUrl(song.picUrl, 80, 80)"
        />
        <span class="ml-2 truncate">{{ song.songName }}</span>
      </div>
      <!-- 歌手 -->
      <span class="w-[30%] flex-shrink truncate flex-auto">{{
        getArtists(song.artists)
      }}</span>
      <!-- 专辑 -->
      <span class="w-[22%] flex-shrink truncate">{{ song.album.name }}</span>
      <!-- 时长 -->
      <span class="w-20">{{ getSongTime(song.duration) }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PlayingIcon from '@/components/playing-icon'
import { formatImageUrl, formatSongTime } from '@/utils/format'

export default {
  name: 'DetailList',
  components: {
    PlayingIcon
  },
  props: {
    songs: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(['playingSong'])
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
