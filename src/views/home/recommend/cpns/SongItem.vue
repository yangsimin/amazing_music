<!--
 * @Author: simonyang
 * @Date: 2022-03-17 11:44:00
 * @LastEditTime: 2022-04-06 13:54:31
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="song-item flex items-center w-full cursor-pointer">
    <!-- 歌曲封面图 -->
    <song-cover
      class="justify-self-start flex-shrink-0 w-20 h-20 rounded-lg"
      :img="$format.formatImageUrl(song.picUrl, 160, 160)"
      @click.native="addSong"
    />
    <!-- 歌曲名称 / 创作人 -->
    <div class="ml-5 flex-grow flex-shrink min-w-0">
      <p
        class="song-name text-xl font-bold text-gray-800 truncate lg:text-lg media:hover:amz-text-hl"
      >
        {{ song.songName }}
      </p>
      <p class="mt-2 text-lg font-normal text-gray-500 truncate lg:text-sm">
        {{ artists }}
      </p>
    </div>
    <!-- 歌曲时长 -->
    <p class="justify-self-end flex-shrink-0 px-4 text-base font-medium">
      {{ formatSongTime(song.duration) }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SongCover from '@/components/song-cover'

export default {
  name: 'SongItem',
  props: {
    // 属性有 picUrl, songName, artists, duration, id
    song: {
      type: Object,
      required: true
    }
  },
  components: {
    SongCover
  },
  computed: {
    artists() {
      const names = this.song.artists.map(artist => artist.name)
      return names.join(' / ')
    }
  },
  methods: {
    ...mapActions(['insertSongs']),
    formatSongTime(duration) {
      return this.$format.formatSongTime(duration)
    },
    addSong() {
      this.insertSongs([this.song])
    }
  }
}
</script>

<style scoped>
.song-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
