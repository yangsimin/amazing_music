<!--
 * @Author: simonyang
 * @Date: 2022-03-28 11:41:37
 * @LastEditTime: 2022-04-07 18:10:40
 * @LastEditors: simonyang
 * @Description: 
 
-->
<template>
  <div class="song-list-detail flex">
    <div class="flex-1 min-w-[40rem] shadow-lg p-5 rounded-lg">
      <list-detail-header :info="info" @playAll="playAll"></list-detail-header>
      <song-list-table
        class="mt-7"
        :songs="songs"
        v-amzLoading="isLoading"
        v-infinite-scroll="loadMore"
      ></song-list-table>
    </div>
    <div class="w-96 min-w-[20rem] ml-5">
      <recommend-card
        :relatedSongLists="relatedSongLists"
        @jumpDetail="jumpDetail"
      ></recommend-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ListDetailHeader from './cpns/ListDetailHeader.vue'
import SongListTable from '@/components/song-list-table'
import RecommendCard from '@/components/recommend-card'
import { getSongListDetail, getSongListTrack, getRelatedSongList } from '@/api'
import { Song, SongListDetail } from '@/types/song/types'
import mixinLifeCycle from '@/mixins/life-cycle'
import Logger from '@/utils/logger'

const Log = Logger.create('SongListDetail', true)

export default {
  name: 'SongListDetail',
  mixins: [mixinLifeCycle(false)],
  components: {
    ListDetailHeader,
    SongListTable,
    RecommendCard
  },

  data: () => ({
    // 歌单简介
    info: {
      id: 0,
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
    relatedSongLists: [],
    isLoading: false,
    limit: 100,
    page: 0
  }),
  computed: {
    songListId() {
      return Number.parseInt(this.$route.params.songListId)
    },
    // 是否能加载更多
    canLoadMore() {
      return this.info.trackCount > this.limit * this.page
    }
  },
  methods: {
    ...mapActions(['insertSongs']),
    // 初始加载
    async requestDetailInfo() {
      this.songs.splice(0)
      this.relatedSongLists.splice(0)

      let data = await getSongListDetail(this.songListId)
      Log.d('初始加载: ', data)
      const songListInfo = new SongListDetail(data)
      Object.assign(this.info, songListInfo)

      await this.requestSongListTrack(this.limit, this.songs.length)

      data = await getRelatedSongList(this.songListId)
      Log.d('获取推荐歌单: ', data)
      this.relatedSongLists.push(
        ...data.playlists.map(playlists => ({
          id: playlists.id,
          coverImgUrl: playlists.coverImgUrl,
          name: playlists.name,
          creatorName: playlists.creator.nickname
        }))
      )
    },
    // 分页加载
    async requestSongListTrack(limit, page) {
      this.isLoading = true
      Log.d('发起分页请求', `limit: ${limit}, page: ${page}`)
      // const data = await getSongListTrack(this.songListId)
      const data = await getSongListTrack(this.songListId, limit, page)
      // 请求后, page 累加
      // TODO 做判断 适当切片
      const rest = this.info.trackCount - this.page * this.limit
      if (rest < this.limit) {
        data.songs = data.songs.splice(-rest)
      }
      this.songs.push(...data.songs.map(song => Song.createFromSongList(song)))
      this.page += 1
      Log.d('加载完成, 当前歌曲总数: ', this.songs.length)
      this.isLoading = false
    },
    playAll() {
      this.insertSongs(this.songs)
    },
    jumpDetail(songList) {
      if (this.info.id !== songList.id) {
        this.$router.push({
          name: 'song-list-detail',
          params: {
            songListId: songList.id
          }
        })
      }
    },
    async loadMore() {
      Log.d(
        `触发加载更多, 歌曲总数: ${this.info.trackCount} 当前歌曲数: ${this.songs.length}`
      )
      if (!this.isLoading && this.canLoadMore) {
        await this.requestSongListTrack(this.limit, this.page)
      }
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      params => {
        if (params.songListId) {
          Log.d('id 改变, 发起数据请求', params)
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
