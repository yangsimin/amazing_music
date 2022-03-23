<!--
 * @Author: simonyang
 * @Date: 2022-03-19 17:34:40
 * @LastEditTime: 2022-03-23 22:45:52
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="player-bar w-full">
    <div
      class="flex flex-wrap items-center content-evenly h-28 md:h-20"
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
        <player-bar-controller
          class="mx-auto !w-52 md:ml-10 md:!w-48"
          @prevClick="prevClick"
          @nextClick="nextClick"
          @playToggle="playToggle"
          :isPlaying="isPlaying"
        ></player-bar-controller>
      </div>
      <player-bar-progress
        ref="playerProgressBar"
        class="order-first w-full md:flex md:flex-1 md:px-10 md:order-0 md:order-none"
        v-model="isPlaying"
        @playEnd="playEnd"
        @error="error"
      ></player-bar-progress>

      <div class="flex items-center">
        <!-- 音量 -->
        <player-bar-volume
          class="hidden flex-1 cursor-pointer media:hover:amz-text-hl lg:block lg:mr-5"
          data-action="clickVolume"
          :volume="volume"
          @updateVolume="updateVolume"
        ></player-bar-volume>
        <!-- 单曲循环/列表循环/随机播放 -->
        <i
          class="hidden flex-1 iconfont before:text-3xl cursor-pointer media:hover:amz-text-hl md:block md:mr-5"
          :class="modeIcon"
          data-action="togglePlayMode"
        ></i>
        <!-- 展示歌词 -->
        <i
          class="hidden flex-1 iconfont icon-lyric cursor-pointer media:hover:amz-text-hl before:text-2xl lg:block lg:mr-5"
          data-action="toggleLyric"
        ></i>
      </div>

      <!-- 播放列表 -->
      <i
        class="iconfont icon-playlist pr-10 cursor-pointer media:hover:amz-text-hl before:text-2xl"
        data-action="toggleList"
      ></i>
    </div>
  </div>
</template>

<script>
import PlayerBarController from './PlayerBarController.vue'
import PlayerBarProgress from './PlayerBarProgress.vue'
import PlayerBarVolume from './PlayerBarVolume.vue'

import {
  PLAY_MODES,
  PLAY_MODES_ICON,
  getPrevSong,
  getNextSong
} from '../PlayMode'

import { CHANGE_PLAYING_INDEX } from '@/types/mutation-types'
import { CHANGE_SONG, SET_VOLUME } from '@/types/action-types'

export default {
  name: 'PlayerBar',
  components: {
    PlayerBarController,
    PlayerBarProgress,
    PlayerBarVolume
  },
  data: () => ({
    // 播放状态
    isPlaying: false,
    // 播放模式
    playMode: PLAY_MODES.SINGLE_LOOP
  }),
  computed: {
    modeIcon() {
      if (this.playMode < 0 || this.playMode >= PLAY_MODES.length) {
        throw TypeError('unknown playMode: ' + this.playMode)
      }
      return PLAY_MODES_ICON[this.playMode]
    },
    // 正在模仿的歌曲
    playingSong() {
      return this.$store.getters.playingSong
    },
    volume() {
      return this.$store.state.volume
    }
  },
  methods: {
    prevClick() {
      console.log('prev')
      if (!this.playingSong) {
        if (this.$store.state.playlist.length === 0) {
          return
        }
        // 场景: 刷新了页面, 歌单有歌曲, 但是 index 为 -1
        // 操作: 将index 设为0, 开始播放
        this.$store.commit(CHANGE_PLAYING_INDEX, 0)
        return
      }
      // 1. 切换上一首歌
      this.$store.dispatch(CHANGE_SONG, getPrevSong(this.playMode))
    },
    nextClick() {
      console.log('next')
      if (!this.playingSong) {
        if (this.$store.state.playlist.length === 0) {
          return
        }
        // 场景: 刷新了页面, 歌单有歌曲, 但是 index 为 -1
        // 操作: 将index 设为0, 开始播放
        this.$store.commit(CHANGE_PLAYING_INDEX, 0)
        return
      }
      // 2. 切换下一首
      this.$store.dispatch(CHANGE_SONG, getNextSong(this.playMode))
    },
    playToggle() {
      if (!this.playingSong) {
        if (this.$store.state.playlist.length === 0) {
          return
        }
        // 场景: 刷新了页面, 歌单有歌曲, 但是 index 为 -1
        // 操作: 将index 设为0, 开始播放
        this.$store.commit(CHANGE_PLAYING_INDEX, 0)
        return
      }
      this.isPlaying = !this.isPlaying
    },
    togglePlayMode() {
      console.log('togglePlayMode', this.playMode)
      if (this.playMode === Object.keys(PLAY_MODES).length - 1) {
        this.playMode = 0
        return
      }
      this.playMode += 1
    },
    clickVolume() {
      console.log('clickVolume')
    },
    toggleLyric() {
      console.log('toggleLyric')
    },
    toggleList() {
      console.log('toggleList')
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
      console.log('end')
      switch (this.playMode) {
        case PLAY_MODES.LIST_LOOP:
        case PLAY_MODES.RANDOM:
          this.nextClick()
          break
        case PLAY_MODES.SINGLE_LOOP:
          // 重置
          this.isPlaying = true
          break
      }
    },
    error(error) {
      console.log('error', error)
      this.isPlaying = false
    },
    updateVolume(volume) {
      this.$store.dispatch(SET_VOLUME, volume)
    }
  },
  created() {}
}
</script>

<style scoped></style>
