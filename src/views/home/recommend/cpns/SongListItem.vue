<!--
 * @Author: simonyang
 * @Date: 2022-03-17 22:33:38
 * @LastEditTime: 2022-04-07 22:13:12
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="playlist-item w-full">
    <song-cover
      class="rounded-lg cursor-pointer"
      :img="$format.formatImageUrl(songList.picUrl, 392, 392)"
      @click.native="addSongs"
    ></song-cover>
    <h3
      class="song-list-name h-10 mt-4 text-lg font-bold leading-5 cursor-pointer amz-truncate-2 media:hover:amz-text-hl lg:text-base lg:h-12"
      @click="jumpDetail"
    >
      {{ songList.name }}
    </h3>
    <p class="mt-2 text-lg text-gray-500 lg:text-sm">
      播放量：{{ formatPlayCount(songList.playCount) }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SongCover from '@/components/song-cover'
import { getSongListTrack } from '@/api'

import { Song } from '@/types/song/types.js'

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
    ...mapActions(['insertSongs']),
    formatPlayCount(count) {
      const newCount = this.$format.formatPlayCount(count)
      return newCount.count + newCount.unit
    },
    async addSongs() {
      const data = await getSongListTrack(this.songList.id, 1000)
      if (data.code !== 200) {
        throw Error('请求数据失败 code:', data.code)
      }
      const songs = data.songs.map(song => {
        return Song.createFromSongList(song)
      })

      this.insertSongs(songs)
    },
    jumpDetail() {
      this.$router.push({
        name: 'song-list-detail',
        params: {
          songListId: this.songList.id
        }
      })
    }
  }
}
</script>

<style scoped>
.song-cover::before {
  font-size: 3.125rem;
}
</style>
