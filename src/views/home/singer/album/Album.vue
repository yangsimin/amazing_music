<!--
 * @Author: simonyang
 * @Date: 2022-04-07 11:33:58
 * @LastEditTime: 2022-04-07 15:05:59
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="album flex">
    <div>
      <album-header :info="info" @playAll="playAll"></album-header>
      <song-list-table
        class="mt-7"
        :songs="songs"
        v-amzLoading="isLoading"
        :albumEnable="false"
      >
        <template v-slot:songName="{ songName, song }">
          {{ songName
          }}<span v-if="song.alias.length > 0" class="ml-5 text-gray-500">{{
            song.alias.join(' / ')
          }}</span>
        </template>
      </song-list-table>
    </div>
    <aside class="w-96 min-w-[20rem] ml-5">
      <recommend-card
        :relatedSongLists="hotAlbums"
        title="Ta的其他热门专辑"
        @jumpDetail="jumpDetail"
      >
        <template v-slot:creatorName="{ item }">
          <span class="text-gray-700 text-base">{{
            getPublishTime(item.publishTime)
          }}</span>
        </template>
      </recommend-card>
    </aside>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AlbumHeader from './cpns/AlbumHeader.vue'
import SongListTable from '@/components/song-list-table'
import RecommendCard from '@/components/recommend-card'

// eslint-disable-next-line no-unused-vars
import { getAlbum, getArtistAlbum } from '@/api'
import { Song, AlbumDetail } from '@/types/song/types'
import mixinLifeCycle from '@/mixins/life-cycle'
import Logger from '@/utils/logger'

const Log = Logger.create('Album', false)

export default {
  name: 'Album',
  mixins: [mixinLifeCycle(false)],
  components: {
    AlbumHeader,
    SongListTable,
    RecommendCard
  },

  data: () => ({
    // 专辑简介
    info: {
      id: 0,
      name: '',
      picUrl: '',
      publishTime: 0,
      description: '',
      company: '',
      artist: '',
      alias: []
    },
    // 歌单包含的歌曲
    songs: [],
    hotAlbums: [],
    isLoading: false
  }),
  computed: {
    songListId() {
      return Number.parseInt(this.$route.params.songListId)
    },
    albumId() {
      return this.$route.params.albumId
    }
  },
  methods: {
    ...mapActions(['insertSongs']),
    async requestDetailInfo() {
      this.isLoading = true
      this.songs.splice(0)
      this.hotAlbums.splice(0)

      // 获取专辑信息
      let data = await getAlbum(this.albumId)
      Log.d(data)
      this.songs.push(...data.songs.map(song => Song.createFromSongList(song)))
      this.info = new AlbumDetail(data.album)
      this.isLoading = false

      // 获取热门专辑推荐
      data = await getArtistAlbum(this.info.artist.id, 0, 5)
      this.hotAlbums.push(
        ...data.hotAlbums.map(album => ({
          id: album.id,
          coverImgUrl: album.picUrl,
          name: album.name,
          creatorName: '',
          publishTime: album.publishTime
        }))
      )
      Log.d(data)
    },
    playAll() {
      this.insertSongs(this.songs)
    },
    getPublishTime(timestamp) {
      return this.$format.formatDate('yyyy-MM-dd', timestamp)
    },
    jumpDetail(album) {
      if (album.id !== this.info.id) {
        this.$router.push({
          name: 'album',
          params: {
            albumId: album.id
          }
        })
      }
    }
  },
  created() {
    this.$watch(
      () => this.$route.params.albumId,
      albumId => {
        if (albumId) {
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
