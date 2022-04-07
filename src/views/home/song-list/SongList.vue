<!--
 * @Author: simonyang
 * @Date: 2022-03-14 12:19:34
 * @LastEditTime: 2022-04-07 19:44:04
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="song-list min-w-[1024px]">
    <div
      class="flex justify-between space-x-3 mt-2 overflow-scroll no-scrollbar"
    >
      <!-- 所有标签 -->
      <cate-card
        v-for="(category, index) in categories"
        :key="category"
        :category="category"
        :tags="filterTags(index)"
        :activeTag="activeTag"
        @changeTag="changeTag"
      ></cate-card>
    </div>
    <!-- 歌单列表 -->
    <div
      class="flex flex-wrap w-full mt-5 min-h-[1024px]"
      v-amzLoading="isLoading"
    >
      <div
        class="w-[12.5%] p-2"
        v-for="songList in songLists"
        :key="songList.id"
      >
        <div class="relative">
          <song-cover
            class="w-full rounded-xl cursor-pointer"
            :img="$format.formatImageUrl(songList.picUrl, 320, 320)"
            alt=""
            @click.native="addSongs(songList.id)"
          />
          <div class="play-count absolute right-0 top-1 z-10 text-white">
            <i class="iconfont icon-player-play"></i>
            <span class="ml-1">{{ getPlayCount(songList.playCount) }}</span>
          </div>
        </div>
        <h3
          class="mt-2 amz-truncate-2 font-bold text-base cursor-pointer hover:amz-text-hl"
          @click="jumpDetail(songList.id)"
        >
          {{ songList.name }}
        </h3>
      </div>
    </div>
    <!-- 分页 -->
    <amz-pagination
      class="flex justify-center my-5"
      :total="pageInfo.total"
      :page-size="limit"
      :current-page="currentPage"
      @current-change="currentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
    ></amz-pagination>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CateCard from './cpns/CateCard.vue'
import SongCover from '@/components/song-cover'
import AmzPagination from '@/base-ui/amz-pagination'

import { getCateList, getTopPlayList, getSongListTrack } from '@/api'
import { Song, SongList } from '@/types/song/types'
import Logger from '@/utils/logger'
import restoreScroll from '@/mixins/restore-scroll'

const Log = Logger.create('SongList', false)

export default {
  name: 'SongList',
  mixins: [restoreScroll],
  components: {
    CateCard,
    SongCover,
    AmzPagination
  },
  data: () => ({
    activeTag: '全部歌单',
    // 类型大类
    categories: [],
    // 所有小类, {name, category, hot}
    allTags: [],
    // 小类对应的当前页歌单
    songLists: [],
    pageInfo: {
      tag: '',
      total: 0
    },
    // 每页显示的数量
    limit: 40,
    // 当前页数, 起始页为1
    currentPage: 1,
    isLoading: false
  }),
  methods: {
    ...mapActions(['insertSongs']),
    // 请求所有标签
    async requestCateList() {
      let data = await getCateList()
      Log.i('requestCateList', data)
      this.categories = []
      for (const key in data.categories) {
        this.categories[key] = data.categories[key]
      }
      this.allTags = data.sub.map(each => ({
        name: each.name,
        category: each.category,
        hot: each.hot
      }))
      // 添加 "全部歌单" 标签
      this.allTags.push({
        name: data.all.name,
        category: data.all.category,
        hot: data.all.hot
      })
    },
    // 请求歌单列表
    async requestSongLists() {
      this.isLoading = true
      this.songLists.splice(0)
      let data
      if (this.pageInfo.tag !== this.activeTag) {
        this.pageInfo.tag = this.activeTag
        this.currentPage = 1
      }
      data = await getTopPlayList(
        this.pageInfo.tag,
        this.limit,
        (this.currentPage - 1) * this.limit
      )
      this.pageInfo.total = data.total
      this.songLists = data.playlists.map(playlist => new SongList(playlist))
      this.isLoading = false
      Log.i(data)
    },
    // 根据类型过滤 tag
    filterTags(category) {
      return this.allTags.filter(cate => cate.category === category)
    },
    // 切换 tag
    changeTag(tag) {
      this.activeTag = tag
    },
    // 将歌单添加进播放列表
    async addSongs(id) {
      Log.d('addSongs')
      const data = await getSongListTrack(id)
      if (data.code !== 200) {
        throw Error('请求数据失败 code:', data.code)
      }
      const songs = data.songs.map(song => {
        return Song.createFromSongList(song)
      })

      this.insertSongs(songs)
    },
    // 跳到歌单详情页面
    jumpDetail(id) {
      Log.d('jumpDetail')
      this.$router.push({
        name: 'song-list-detail',
        params: {
          songListId: id
        }
      })
    },
    // 格式化播放次数
    getPlayCount(count) {
      const ret = this.$format.formatPlayCount(count)
      return ret.count + ret.unit
    },
    currentChange(page) {
      Log.d('currentchange', page)
      this.currentPage = page
    },
    prevClick() {
      Log.d('prev')
      this.currentPage -= 1
    },
    nextClick() {
      Log.d('next')
      this.currentPage += 1
    }
  },
  watch: {
    activeTag(tag) {
      Log.d('watch', tag)
      this.requestSongLists()
    },
    currentPage() {
      document.body.scrollTo(0, 0)
      this.requestSongLists()
    }
  },
  beforeRouteEnter(to, from, next) {
    Log.d('beforeRouteEnter', to, from)
    next(vm => {
      if (to.query.tag) {
        Log.d('vm', vm)
        vm.activeTag = to.query.tag
      }
    })
  },
  created() {
    this.requestCateList()
    this.requestSongLists()
  }
}
</script>

<style scoped>
.song-cover::before {
  font-size: 3.125rem;
}
.icon-player-play::before {
  font-size: 0.5rem;
}
.play-count {
  @apply text-sm py-1.5 pl-2 pr-4;
  background: url('https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png')
    no-repeat;
  background-size: cover;
  background-position-x: 100%;
  border-bottom-left-radius: 30%;
  pointer-events: none;
}
</style>
