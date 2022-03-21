<!--
 * @Author: simonyang
 * @Date: 2022-03-19 17:31:32
 * @LastEditTime: 2022-03-21 23:16:12
 * @LastEditors: simonyang
 * @Description: 
      输入: 展示的信息, 播放控制; 
      输出: 进度; 
      功能: 读秒, 可暂停, 回馈进度, 同步 audio 状态
-->
<template>
  <div class="player-progress-bar">
    <div class="flex justify-between pb-2">
      <div class="">
        <span class="text-xl">{{ songName }}</span
        >&nbsp;&nbsp;-&nbsp;&nbsp;<span class="text-base text-gray-500">
          {{ artists }}
        </span>
      </div>
      <div class="text-base text-gray-800">
        {{ formatCurrentTime }}&nbsp;/&nbsp;{{ formatDuration }}
      </div>
    </div>
    <amz-seek-bar
      v-model="progress"
      :loadProgress="loadProgress"
    ></amz-seek-bar>
    <audio
      ref="audio"
      :src="url"
      @timeupdate="timeupdate"
      @play="toggle"
      @pause="toggle"
      @durationchange="durationchange"
      @loadeddata="loadeddata"
      @progress="onProgress"
      @waiting="waiting"
      @ended="ended"
      @error="error"
      preload="auto"
    ></audio>
  </div>
</template>

<script>
import AmzSeekBar from '@/base-ui/amz-seek-bar'
import { formatSongTime } from '@/utils/format'

export default {
  name: 'PlayerProgressBar',
  components: {
    AmzSeekBar
  },
  model: {
    prop: 'isPlaying',
    event: 'stateChange'
  },
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    // 缓冲进度
    loadProgress: 0,
    // 播放进度
    progress: 0,
    playerTimer: null,
    url: 'http://m8.music.126.net/20220321232946/5c6947386dcb252fc70294cf7d327db6/ymusic/8c93/b058/0206/4a98a17577e8f43cb174407c4327d5a3.mp3',
    duration: 0,
    currentTime: 0
  }),
  computed: {
    formatCurrentTime() {
      console.log('formatCurrentTime', this.currentTime)
      return formatSongTime(this.currentTime, false)
    },
    formatDuration() {
      console.log('formatDuration', this.duration)
      return formatSongTime(this.duration, false)
    },
    songName() {
      return this.$store.getters.playingSong.songName
    },
    artists() {
      if (!this.$store.getters.playingSong.artists) {
        return ''
      }
      return this.$store.getters.playingSong.artists.join(' / ')
    }
  },
  watch: {
    isPlaying(playing) {
      // FIXME 可能不需要计时器了
      console.log(playing)
      if (playing) {
        // 如果已完成 或者 音乐时长为0 返回完成
        if (this.progress >= 100 || this.duration === 0) {
          this.$emit('playEnd')
          return
        }
        // 播放
        this.$refs.audio.play()
      } else {
        // 暂停
        this.$refs.audio.pause()
      }
    }
  },
  methods: {
    // 重置播放进度
    reset() {
      this.progress = 0
      this.$refs.audio.currentTime = 0
    },
    // 清除数据, 包括播放进度, 缓存状态, 音频链接
    clear() {
      this.reset()
      this.loadProgress = 0
      this.$$refs.audio.src = ''
      this.$refs.audio.load()
    },
    // 播放时触发, 用于获取当前播放时间点
    timeupdate(event) {
      // FIXME 使用节流
      console.log(event.type, event.target.currentTime)
      this.currentTime = event.target.currentTime

      // 刷新进度
      this.progress = (this.currentTime / this.duration) * 100
    },
    // 播放/暂停触发
    toggle(event) {
      console.log(event.type)
      if (event.type === 'play') {
        this.$emit('stateChange', true)
      } else if (event.type === 'pause') {
        this.$emit('stateChange', false)
      }
    },
    // 获取到音频总时长时触发
    durationchange(event) {
      console.log(event.type)
      this.duration = event.target.duration
    },
    // 开始获取音频数据时触发
    loadeddata() {},
    // 缓冲时触发, 获取缓冲进度
    onProgress(event) {
      console.log(event.type)
      let timeRanges = event.target.buffered
      let timeBuffered = timeRanges.end(timeRanges.length - 1)
      this.loadProgress = (timeBuffered / event.target.duration) * 100
    },
    // 等待缓冲时触发
    waiting() {
      // TODO 可以修改 loading 的 ui
    },
    // 播放结束时触发
    ended(event) {
      console.log(event.type)
      this.$emit('playEnd')
    },
    // 发生异常时触发
    error(event) {
      console.log(event.type)
      // TODO 再判断具体错误
      // TODO 重试
    }
  },
  created() {},
  mounted() {}
}
</script>

<style scoped></style>
