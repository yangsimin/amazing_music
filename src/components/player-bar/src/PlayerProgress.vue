<!--
 * @Author: simonyang
 * @Date: 2022-03-19 17:31:32
 * @LastEditTime: 2022-04-11 10:28:20
 * @LastEditors: simonyang
 * @Description: 
      输入: 展示的信息, 播放控制; 
      输出: 进度; 
      功能: 读秒, 可暂停, 回馈进度, 同步 audio 状态
      1. 开始
        1.1 如果 playingSong 为空, 则不播放, 回调播放结束
        1.2 如果存在 playingSong, 分两种情况
          1.2.1 首次播放, playingSong.url 为空
          1.2.2 继续播放, playingSong.url 有值
      2. 暂停
      3. 播放完成
        3.1 回调 end, 重置进度
      4. 播放异常
        4.1 回调 error, 重置进度
        4.2 playingSong.url 置空
-->
<template>
  <div class="player-progress flex items-center">
    <div class="h-20 w-20 p-2 mr-2 md:block">
      <amz-image
        class="h-full rounded-lg shadow-sm overflow-hidden"
        :src="$format.formatImageUrl(playingSong.picUrl, 160, 160)"
        alt=""
      />
    </div>
    <div class="flex-1 mr-4 md:mr-0">
      <div class="flex justify-between pb-2">
        <div class="flex-1 w-20 truncate">
          <span class="text-xl">{{ songName }}</span
          >&nbsp;&nbsp;-&nbsp;&nbsp;<span class="text-base text-gray-500">
            {{ artists }}
          </span>
        </div>
        <div class="flex-shrink-0 text-base text-gray-800">
          {{ formatCurrentTime }}&nbsp;/&nbsp;{{ formatDuration }}
        </div>
      </div>
      <amz-seek-bar
        :progress="progress"
        @pointerMove="pointerMove"
        @pointerUp="pointerUp"
        :loadProgress="loadProgress"
        :canSeek="playingIndex !== -1"
      ></amz-seek-bar>
    </div>

    <audio
      ref="audio"
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
      class="hidden"
    ></audio>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

import AmzSeekBar from '@/base-ui/amz-seek-bar'
import AmzAudio from '../AmzAudio'

import { throttle } from '@/utils/performance'
import Logger from '@/utils/logger'
const Log = Logger.create('PlayerProgress')

export default {
  name: 'PlayerProgress',
  components: {
    AmzSeekBar
  },
  data: () => ({
    // 缓冲进度 0 ~ 1.0
    loadProgress: 0,
    // 播放进度 0 ~ 1.0
    progress: 0,
    // 音频总时长
    duration: 0,
    // 当前播放的时间点
    currentTime: 0,
    // AmzAudio 实例, 用于控制 audio 元素
    amzAudio: {},
    // 是否拖动进度条的标志位
    isSeeking: false
  }),
  computed: {
    ...mapGetters(['playingSong', 'playingIndex', 'volume', 'isPlaying']),
    formatCurrentTime() {
      return this.$format.formatSongTime(this.currentTime, false)
    },
    formatDuration() {
      return this.$format.formatSongTime(this.duration, false)
    },
    songName() {
      return this.playingSong.songName
    },
    artists() {
      if ('artists' in this.playingSong) {
        let artists = this.playingSong.artists
        artists = artists.map(artist => artist.name)
        return artists.join('/')
      }
      return undefined
    }
  },
  watch: {
    // 监听外部修改 isPlaying 标志位
    isPlaying(playing) {
      if (playing) {
        if (this.playingIndex < 0) {
          this.emitFinish()
          return
        }
        Log.d('watch: isPlaying: ', playing)
        this.playSong(this.playingSong)
      } else {
        // 暂停
        this.amzAudio.pause()
      }
    },
    playingSong(song) {
      Log.d('watch: playingSong: ', song)
      if (Object.keys(song).length === 0) {
        this.resetAll()
        return
      }
      // 如果新的 song 是当前播放的 song, 则忽略
      if (this.amzAudio.getSource() === song.url) {
        return
      }
      this.playSong(song)
    },
    volume(newVal) {
      this.amzAudio.setVolume(newVal)
    }
  },
  methods: {
    ...mapMutations(['changePlayingState']),
    // 播放结束发射结束事件
    emitFinish() {
      this.resetProgress()
      this.$emit('playEnd')
    },
    emitError(message) {
      this.resetProgress()
      this.$emit('error', message)
    },
    playSong(song) {
      Log.d('playSong', song)

      if (this.amzAudio.getSource() !== song.url) {
        this.amzAudio.setSource(song.url)
      }
      this.amzAudio.play()
    },
    // 重置播放进度
    resetProgress() {
      this.progress = 0
      this.amzAudio.resetProgress()
    },
    // 重置所有状态
    resetAll() {
      this.amzAudio.pause()
      this.resetProgress()
      this.loadProgress = 0
      this.duration = 0
      this.currentTime = 0
    },
    // 播放时触发, 用于获取当前播放时间点
    timeupdate: throttle(function () {
      // 如果正在拖动进度条, 则阻止 audio 回调刷新 ui
      if (this.isSeeking) {
        return
      }
      this.currentTime = this.amzAudio.getCurrentTime()
      // 刷新进度
      this.progress = this.amzAudio.getProgress()
    }, 100),
    // 播放/暂停触发
    toggle(event) {
      Log.d(event.type)
      this.changePlayingState(event.type === 'play')
    },
    // 获取到音频总时长时触发
    durationchange() {
      if (this.isPlaying) {
        this.duration = this.amzAudio.getDuration()
      }
    },
    // 开始获取音频数据时触发
    loadeddata() {},
    // 缓冲时触发, 获取缓冲进度
    onProgress() {
      if (this.isPlaying) {
        this.loadProgress = this.amzAudio.getLoadProgress()
      }
    },
    // 等待缓冲时触发
    // TODO 可以修改 loading 的 ui
    waiting() {},
    // 播放结束时触发
    ended() {
      this.emitFinish()
    },
    // 发生异常时触发
    error(event) {
      Log.d(event.type, event.target.error)
      let errorMsg = ''
      switch (event.target.error.code) {
        case MediaError.MEDIA_ERR_ABORTED: // 用户中止
          errorMsg = '用户中止'
          break
        case MediaError.MEDIA_ERR_NETWORK: // 网络异常
          errorMsg = '网络异常'
          break
        case MediaError.MEDIA_ERR_DECODE: // 解码失败
          errorMsg = '解码失败'
          break
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED: // 资源不合适
          errorMsg = '资源不合适'
          break
      }
      this.resetAll()
      this.emitError({
        code: event.target.error.code,
        message: errorMsg
      })
    },
    pointerMove(progress) {
      // 只修改 formatCurrentTime, 为了不影响拖拽进度时的听感
      // 设置 isSeeking 标志, 避免 audio 回调刷新 dot 的位置
      this.isSeeking = true
      this.currentTime = this.amzAudio.getDuration() * progress
      this.progress = progress
    },
    pointerUp(progress) {
      // 修改 audio.currentTime 和 formatCurrentTime
      this.isSeeking = false
      const time = this.amzAudio.getDuration() * progress
      this.amzAudio.setCurrentTime(time)
    }
  },
  created() {},
  mounted() {
    this.amzAudio = new AmzAudio(this.$refs.audio)
  }
}
</script>

<style scoped></style>
