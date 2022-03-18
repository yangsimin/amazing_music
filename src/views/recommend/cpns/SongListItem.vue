<!--
 * @Author: simonyang
 * @Date: 2022-03-17 22:33:38
 * @LastEditTime: 2022-03-18 22:40:57
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="song-list-item w-full">
    <song-cover
      class="rounded-lg cursor-pointer"
      :img="getCustomImage(songList.picUrl, 392, 392)"
    ></song-cover>
    <h3 class="h-10 mt-4 text-sm leading-5 cursor-pointer">
      {{ songList.name }}
    </h3>
    <p class="mt-2 text-sm text-gray-500">
      播放量：{{ formatPlayCount(songList.playCount) }}
    </p>
  </div>
</template>

<script>
import SongCover from '@/components/song-cover'
import { SongList } from '@/api/recommend'
import { formatImageUrl, formatPlayCount } from '@/utils/format'

export default {
  name: 'SongListItem',
  components: {
    SongCover
  },
  props: {
    'song-list': {
      type: SongList,
      required: true
    }
  },
  methods: {
    getCustomImage(url, width, height) {
      return formatImageUrl(url, width, height)
    },
    formatPlayCount(count) {
      const newCount = formatPlayCount(count)
      return newCount.count + newCount.unit
    }
  }
}
</script>

<style scoped>
.song-cover::before {
  font-size: 50px;
}
</style>
