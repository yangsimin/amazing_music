<!--
 * @Author: simonyang
 * @Date: 2022-04-04 16:37:39
 * @LastEditTime: 2022-04-07 18:10:18
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div
    class="detail-album flex flex-wrap -mr-5 min-h-screen"
    v-amzLoading="isLoading"
    v-infinite-scroll="loadMore"
  >
    <div class="w-2/12 pr-5 mt-5" v-for="album in albums" :key="album.id">
      <song-cover
        class="w-full cursor-pointer rounded-md overflow-hidden"
        :img="$format.formatImageUrl(album.picUrl, 400, 400)"
        @click.native="addSongs(album.id)"
      ></song-cover>
      <h3
        class="mt-3 text-lg truncate cursor-pointer media:hover:amz-text-hl"
        @click="jumpDetail(album.id)"
      >
        {{ album.name }}
      </h3>
      <p class="text-gray-500">
        {{ getPublishTime(album.publishTime) }}（{{ album.size }}&nbsp;首）
      </p>
    </div>
  </div>
</template>

<script>
import SongCover from '@/components/song-cover'
import { mapActions } from 'vuex'
import { getArtistAlbum, getAlbum } from '@/api'
import { Album, Song } from '@/types/song/types'
import Logger from '@/utils/logger'

const Log = Logger.create('DetailAlbum')

export default {
  name: 'DetailAlbum',
  props: {
    id: Number
  },
  components: {
    SongCover
  },
  data: () => ({
    albums: [],
    page: 0,
    limit: 18,
    more: false,
    isLoading: false
  }),
  methods: {
    ...mapActions(['insertSongs']),
    async requestArtistAlbum() {
      this.isLoading = true
      const data = await getArtistAlbum(
        this.id,
        this.page * this.limit,
        this.limit
      )
      this.albums.push(...data.hotAlbums.map(album => new Album(album)))
      this.more = data.more
      Log.d(data)
      this.isLoading = false
    },
    getPublishTime(timestamp) {
      return this.$format.formatDate('yyyy-MM-dd', timestamp)
    },
    async loadMore() {
      if (!this.isLoading && this.more) {
        this.page += 1
        await this.requestArtistAlbum()
      }
    },
    async addSongs(albumId) {
      Log.d('addSongs', albumId)
      const data = await getAlbum(albumId)
      if (data.code !== 200) {
        throw Error('请求数据失败 code:', data.code)
      }
      const songs = data.songs.map(song => {
        return Song.createFromSongList(song)
      })

      this.insertSongs(songs)
    },
    jumpDetail(albumId) {
      // TODO
      Log.d('jumpDetail', albumId)
      this.$router.push({
        name: 'album',
        params: {
          albumId
        }
      })
    }
  },
  created() {
    this.requestArtistAlbum()
  }
}
</script>

<style scoped>
.song-cover::before {
  font-size: 4rem;
}
</style>
