<!--
 * @Author: simonyang
 * @Date: 2022-03-24 19:38:41
 * @LastEditTime: 2022-04-11 18:30:07
 * @LastEditors: simonyang
 * @Description: 
  当前播放   歌曲总数      清空列表
  序号  歌曲  歌手  时长 (播放/删除)
  奇偶行不同背景色
  播放中的歌曲高亮
-->
<template>
  <div class="playlist flex flex-col flex-nowrap h-full p-5">
    <div class="flex justify-between items-end">
      <div class="text-xl pl-2">
        当前播放&nbsp;(&nbsp;{{ playlist.length }}&nbsp;首&nbsp;)
      </div>
      <span
        class="text-lg cursor-pointer mr-5 media:hover:amz-text-hl"
        @click="clearAll"
      >
        清空列表
        <i class="iconfont icon-del ml-1 before:text-xl" />
      </span>
    </div>
    <div class="flex pl-9 pr-3 pb-2 mt-6 border-b-2 text-gray-400">
      <div class="flex-1 w-28">歌曲</div>
      <div class="w-4/12">歌手</div>
      <div class="w-2/12">时长</div>
    </div>
    <amz-recycler-view
      class="flex-1 relative pt-2 overflow-hidden"
      :items="playlist"
      :rowHeight="48"
      :height="600"
      :bufferSize="5"
    >
      <template v-slot:default="{ value: song, index }">
        <div
          class="flex group items-center relative py-3 pl-9 pr-5"
          :class="[index === playingIndex ? activeClass : '']"
          @dblclick.prevent="playSong(index)"
        >
          <div class="absolute left-0 top-1/2 -translate-y-1/2 w-7 text-right">
            <playing-icon
              v-if="index === playingIndex"
              class="!h-11 scale-[0.35] -translate-x-4"
            ></playing-icon>
            <p v-else>{{ index + 1 }}</p>
          </div>
          <div
            class="flex-1 w-28 truncate"
            :class="song.fee === 1 ? 'vip' : ''"
          >
            <span class="cursor-pointer" @click="playSong(index)">{{
              song.songName
            }}</span>
          </div>
          <div class="w-4/12 truncate">
            {{ formatArtists(song.artists) }}
          </div>
          <div class="w-2/12">{{ getSongTime(song.duration) }}</div>
          <i
            class="iconfont icon-cross-thin absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer before:text-lg media:hover:amz-text-hl"
            @click.prevent.stop="delSong(index)"
            @dblclick.prevent.stop
            @touchstart.prevent.stop="delSong(index)"
          ></i>
        </div>
      </template>
    </amz-recycler-view>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import PlayingIcon from '@/components/playing-icon'
import AmzRecyclerView from '@/base-ui/amz-recycler-view'

import mixinLifeCycle from '@/mixins/life-cycle'

export default {
  name: 'Playlist',
  mixins: [mixinLifeCycle(false)],
  components: {
    PlayingIcon,
    AmzRecyclerView
  },
  data: () => ({
    activeClass: ['!bg-red-100', '!bg-opacity-50', '!text-red-700']
  }),
  computed: {
    ...mapGetters(['playlist', 'playingIndex'])
  },
  listHeight() {
    return 500
  },
  methods: {
    ...mapActions(['deleteSong', 'clearSongList']),
    ...mapMutations(['changePlayingIndex']),
    formatArtists(artists) {
      return artists.map(artist => artist.name).join(' / ')
    },
    formatNum(index) {
      if (index < 10) {
        return '0' + index
      }
      return index
    },
    getSongTime(duration) {
      return this.$format.formatSongTime(duration, true)
    },
    playSong(index) {
      this.changePlayingIndex(index)
    },
    delSong(index) {
      this.deleteSong(index)
    },
    clearAll() {
      this.clearSongList()
    }
  }
}
</script>

<style scoped>
.vip::after {
  content: 'vip';
  @apply ml-2 px-1 border rounded border-red-600 text-red-600 text-sm;
}
</style>
