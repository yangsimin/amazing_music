<!--
 * @Author: simonyang
 * @Date: 2022-03-19 17:34:40
 * @LastEditTime: 2022-03-21 22:58:52
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
        <player-controller
          class="mx-auto !w-52 md:ml-10 md:!w-48"
          @prevClick="prevClick"
          @nextClick="nextClick"
          @playToggle="playToggle"
          :isPlaying="isPlaying"
        ></player-controller>
      </div>
      <player-progress-bar
        ref="playerProgressBar"
        class="order-first w-full md:block md:flex-1 md:px-10 md:order-0 md:order-none"
        v-model="isPlaying"
        @playEnd="playEnd"
      ></player-progress-bar>

      <div class="flex items-center">
        <!-- 音量 -->
        <i
          class="hidden flex-1 iconfont icon-volume-middle before:text-3xl cursor-pointer media:hover:amz-text-hl lg:block lg:mr-5"
          data-action="clickVolume"
        ></i>
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
import PlayerController from './PlayerController.vue'
import PlayerProgressBar from './PlayerProgressBar.vue'
// 歌曲播放模式, 列表循环 / 单曲循环 / 随机播放
const PLAY_MODES = ['listLoop', 'singleLoop', 'random']
const PLAY_MODES_ICON = [
  'icon-mode-list',
  'icon-mode-single',
  'icon-mode-random'
]

export default {
  name: 'PlayerBar',
  components: {
    PlayerController,
    PlayerProgressBar
  },
  data: () => ({
    // 播放状态
    isPlaying: false,
    // 播放模式
    playMode: 0
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
    }
  },
  methods: {
    prevClick() {
      console.log('prev')
      // 1. 重置 PlayerProgressBar 状态
      this.reset()
      // 2. 切换上一首歌
      this.$store.dispatch('changeSong', {
        mode: this.playMode,
        step: -1
      })
    },
    nextClick() {
      console.log('next')
      // 1. 重置 PlayerProgressBar 状态
      this.reset()
      // 2. 切换下一首
      this.$store.dispatch('changeSong', {
        mode: this.playMode,
        step: 1
      })
    },
    playToggle() {
      console.log('toggle')
      this.isPlaying = !this.isPlaying
    },
    togglePlayMode() {
      if (this.playMode === PLAY_MODES.length - 1) {
        this.playMode = 0
      } else {
        this.playMode += 1
      }
      console.log('togglePlayMode')
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
      this.isPlaying = false
    },
    // 重置状态
    reset() {
      console.log('reset')
      this.isPlaying = false
      this.$refs.playerProgressBar.reset()
    },
    requestSong() {
      // 如果正在播放, 则忽略
      if (this.isPlaying) {
        return
      }
      this.playingSong.id
    }
  },
  created() {}
}
</script>

<style scoped></style>
