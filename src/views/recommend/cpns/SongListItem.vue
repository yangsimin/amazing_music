<!--
 * @Author: simonyang
 * @Date: 2022-03-17 22:33:38
 * @LastEditTime: 2022-03-24 17:51:40
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="playlist-item w-full">
    <song-cover
      class="rounded-lg cursor-pointer"
      :img="getCustomImage(songList.picUrl, 392, 392)"
      @click.native="addSongs"
    ></song-cover>
    <h3
      class="song-list-name h-10 mt-4 text-lg leading-5 cursor-pointer media:hover:amz-text-hl lg:text-sm"
    >
      {{ songList.name }}
    </h3>
    <p class="mt-2 text-lg text-gray-500 lg:text-sm">
      播放量：{{ formatPlayCount(songList.playCount) }}
    </p>
  </div>
</template>

<script>
import SongCover from '@/components/song-cover'
import { formatImageUrl, formatPlayCount } from '@/utils/format'
import { getSongListTrack } from '@/api/common'

import { Song } from '@/types/song/types.js'
import { INSERT_SONGS } from '@/types/action-types.js'

export default {
  name: 'SongListItem',
  components: {
    SongCover
  },
  props: {
    'song-list': {
      type: Object, // SongList
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
    },
    async addSongs() {
      const data = await getSongListTrack(this.songList.id, 20, 0)
      if (data.code !== 200) {
        throw Error('请求数据失败 code:', data.code)
      }
      const songs = data.songs.map(song => {
        return Song.createFromSongList(song)
      })

      this.$store.dispatch(INSERT_SONGS, songs)
    }
  }
}
</script>

<style scoped>
.song-cover::before {
  font-size: 50px;
}
/* 处理多行文本溢出, 适用于 webkit 浏览器和移动端 */
.song-list-name {
  overflow: hidden;
  /** 将元素作为弹性盒子显示 */
  display: -webkit-box;
  /** 显示的行数 */
  -webkit-line-clamp: 2;
  /** 设置弹性盒子子元素的排列方式 */
  -webkit-box-orient: vertical;
}
</style>
