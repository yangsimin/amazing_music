<!--
 * @Author: simonyang
 * @Date: 2022-03-19 17:34:40
 * @LastEditTime: 2022-04-07 19:59:39
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="player-bar">
    <div
      class="relative z-20 flex flex-wrap items-center content-evenly h-28 mb-7 md:h-20 md:mb-0 md:flex-nowrap"
      @click.prevent="takeAction"
    >
      <!-- 单曲循环/列表循环/随机播放 -->
      <i
        class="iconfont before:text-3xl pl-10 cursor-pointer media:hover:amz-text-hl md:hidden"
        :class="modeIcon"
        data-action="togglePlayMode"
      ></i>

      <!-- 上一首/播放/下一首 -->
      <div class="flex-1 md:flex-grow-0">
        <player-controller
          class="mx-auto !w-52 md:ml-10 md:!w-48"
          @prevClick="prevClick"
          @nextClick="nextClick"
          @playToggle="playToggle"
        ></player-controller>
      </div>
      <player-progress
        ref="playerProgressBar"
        class="order-first w-full md:flex md:flex-1 md:px-10 md:order-0 md:order-none"
        @playEnd="playEnd"
        @error="error"
      ></player-progress>

      <div class="flex items-center">
        <!-- 音量 -->
        <player-volume
          class="hidden flex-1 cursor-pointer media:hover:amz-text-hl lg:block lg:mr-5"
          data-action="clickVolume"
          :volume="volume"
          @updateVolume="updateVolume"
          @muted="volumeMuted"
        ></player-volume>
        <!-- 单曲循环/列表循环/随机播放 -->
        <i
          class="hidden flex-1 iconfont before:text-3xl cursor-pointer media:hover:amz-text-hl md:block md:mr-5"
          :class="modeIcon"
          data-action="togglePlayMode"
        ></i>
        <!-- 展示歌词 -->
        <i
          class="hidden flex-1 iconfont icon-lyric cursor-pointer media:hover:amz-text-hl before:text-2xl lg:block lg:mr-5"
          :class="{ 'amz-text-hl': isLyricShow }"
          data-action="toggleLyric"
        ></i>
      </div>
      <!-- 播放列表 -->
      <div v-clickOutside="closePlaylist" :data-show="isPlaylistShow">
        <i
          class="iconfont icon-playlist pr-10 cursor-pointer media:hover:amz-text-hl before:text-2xl"
          :class="{ 'amz-text-hl': isPlaylistShow }"
          data-action="toggleList"
        ></i>
        <!-- 播放列表 -->
        <transition name="playlist">
          <playlist
            class="fixed right-0 bottom-20 h-[70%] w-[90%] bg-white shadow-inner z-20 md:h-[calc(100%-5rem)] md:w-[600px]"
            v-show="isPlaylistShow"
          ></playlist>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import PlayerController from './PlayerController.vue'
import PlayerProgress from './PlayerProgress.vue'
import PlayerVolume from './PlayerVolume.vue'
import Playlist from '@/components/playlist'
import PlayerLyric from '@/components/player-lyric'

import { getPrevSong, getNextSong } from '../get-song'
import { playModes, playModesIcon } from '@/common/play-mode'
import clickOutside from '@/directives/click-outside/directives'

import Logger from '@/utils/logger'
const Log = Logger.create('PlayerBar')

export default {
  name: 'PlayerBar',
  props: {
    isLyricShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PlayerController,
    PlayerProgress,
    PlayerVolume,
    Playlist,
    PlayerLyric
  },
  directives: {
    clickOutside
  },
  data: () => ({
    // 播放模式
    lastVolume: 0,
    isPlaylistShow: false
  }),
  computed: {
    ...mapGetters([
      'playMode',
      'playingIndex',
      'volume',
      'playlist',
      'isPlaying',
      'playingSong'
    ]),
    modeIcon() {
      if (this.playMode < 0 || this.playMode >= playModes.length) {
        throw TypeError('unknown playMode: ' + this.playMode)
      }
      return playModesIcon[this.playMode]
    }
  },
  methods: {
    ...mapActions(['changeSong', 'setVolume']),
    ...mapMutations([
      'changePlayingIndex',
      'changePlayingState',
      'changePlayMode'
    ]),
    keydown(event) {
      if (event.code === 'Space') {
        event.preventDefault()
        this.changePlayingState(!this.isPlaying)
      }
    },
    prevClick() {
      Log.d('prev')
      if (this.playingIndex < 0) {
        if (this.playlist.length === 0) {
          return
        }
        // 场景: 刷新了页面, 歌单有歌曲, 但是 index 为 -1
        // 操作: 将index 设为0, 开始播放
        this.changePlayingIndex(0)
        return
      }
      // 1. 切换上一首歌
      this.changeSong(getPrevSong(this.playMode))
    },
    nextClick() {
      Log.d('next')
      if (this.playingIndex < 0) {
        if (this.playlist.length === 0) {
          return
        }
        // 场景: 刷新了页面, 歌单有歌曲, 但是 index 为 -1
        // 操作: 将index 设为0, 开始播放
        this.changePlayingIndex(0)
        return
      }
      // 2. 切换下一首
      this.changeSong(getNextSong(this.playMode))
    },
    playToggle() {
      if (this.playingIndex < 0) {
        if (this.playlist.length === 0) {
          return
        }
        // 场景: 刷新了页面, 歌单有歌曲, 但是 index 为 -1
        // 操作: 将index 设为0, 开始播放
        this.changePlayingIndex(0)
        return
      }
      this.changePlayingState(!this.isPlaying)
    },
    togglePlayMode() {
      Log.d('togglePlayMode', this.playMode)
      if (this.playMode === Object.keys(playModes).length - 1) {
        this.changePlayMode(0)
        return
      }
      this.changePlayMode(this.playMode + 1)
    },
    clickVolume() {
      Log.d('clickVolume')
    },
    toggleLyric() {
      Log.d('toggleLyric')
      this.$emit('toggleLyric')
    },
    toggleList() {
      Log.d('toggleList')
      this.isPlaylistShow = !this.isPlaylistShow
    },
    takeAction(event) {
      const action = event.target.dataset.action
      if (!action) {
        return
      }
      switch (action) {
        case 'togglePlayMode':
        case 'clickVolume':
        case 'toggleLyric':
        case 'toggleList':
          this[action]()
      }
    },
    playEnd() {
      Log.d('end')
      switch (this.playMode) {
        case playModes.LIST_LOOP:
        case playModes.RANDOM:
          this.nextClick()
          break
        case playModes.SINGLE_LOOP:
          // 重置
          this.changePlayingState(true)
          break
      }
    },
    error(error) {
      Log.d('error', error)
      switch (error.code) {
        case MediaError.MEDIA_ERR_NETWORK:
          this.$message.error('网络异常, 请重试')
          break
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          if (this.playingSong.fee === 1) {
            this.$message.error('无法获取歌曲资源, 需要开通 vip')
          }
          break
      }
      this.changePlayingState(false)
      this.nextClick()
    },
    updateVolume(volume) {
      this.setVolume(volume)
    },
    volumeMuted(muted) {
      Log.d('muted', muted)
      if (muted) {
        this.lastVolume = this.volume
        // 静音操作
        this.setVolume(0)
      } else {
        // 恢复音量
        this.setVolume(this.lastVolume)
      }
    },
    closePlaylist(el, event) {
      if (event.target.closest('.player-bar')) {
        return
      }
      this.isPlaylistShow = false
    }
  },
  mounted() {
    document.addEventListener('keydown', this.keydown)
  },
  destroyed() {
    document.removeEventListener('keydown', this.keydown)
  }
}
</script>

<style scoped>
.playlist-enter-active,
.playlist-leave-active {
  @apply transition-all duration-300;
}

.playlist-enter,
.playlist-leave-to {
  @apply translate-x-full opacity-80;
}
</style>
