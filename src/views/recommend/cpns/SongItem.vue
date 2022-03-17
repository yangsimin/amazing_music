<!--
 * @Author: simonyang
 * @Date: 2022-03-17 11:44:00
 * @LastEditTime: 2022-03-17 22:33:12
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="song-item flex items-center w-full cursor-pointer">
    <!-- 歌曲封面图 -->
    <song-cover
      class="justify-self-start flex-shrink-0 w-20 h-20 rounded-lg"
      :img="getCustomImage(song.picUrl, 160, 160)"
    />
    <!-- 歌曲名称 / 创作人 -->
    <div class="ml-5 flex-grow flex-shrink min-w-0">
      <p
        class="song-name text-base font-bold text-gray-800 truncate lg:text-lg hover:amz-text-hl"
      >
        {{ song.songName }}
      </p>
      <p class="mt-2 text-xs font-normal text-gray-500">
        {{ song.artists.join(' / ') }}
      </p>
    </div>
    <!-- 歌曲时长 -->
    <p class="justify-self-end flex-shrink-0 px-4 text-base font-medium">
      {{ getSongTime(song.duration) }}
    </p>
  </div>
</template>

<script>
import { Song } from '@/api/recommend-songs'
import { customImage } from '@/api/utils/url'
import { getSongTime } from '@/utils/format'

import SongCover from '@/components/song-cover'

export default {
  name: 'SongItem',
  props: {
    // 属性有 picUrl, songName, artists, duration, id
    song: {
      type: Song,
      required: true
    }
  },
  components: {
    SongCover
  },
  methods: {
    getSongTime(duration) {
      return getSongTime(duration)
    },
    getCustomImage(imageUrl, width, height) {
      return customImage(imageUrl, width, height)
    },
    playMusic() {
      console.log('play')
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
