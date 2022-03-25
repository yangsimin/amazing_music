<!--
 * @Author: simonyang
 * @Date: 2022-03-19 18:08:25
 * @LastEditTime: 2022-03-24 17:54:54
 * @LastEditors: simonyang
 * @Description:  emits: ['pointerMove', 'pointerUp']
-->
<template>
  <div class="AmzSeekBar relative">
    <!-- background  进度底色-->
    <div
      class="absolute rounded-full bg-gray-200 z-0 cursor-pointer shadow-inner"
      :class="
        horizontal
          ? ['w-full', 'h-2', 'top-1/2', '-translate-y-1/2']
          : ['w-2', 'h-full', 'left-1/2', '-translate-x-1/2']
      "
      :style="seekBarStyle.background"
      ref="background"
      @click="skip"
    ></div>
    <!-- front 进度前景色, 用于显示缓冲条-->
    <div
      class="absolute rounded-full bg-red-200 z-10 pointer-events-none shadow-inner"
      :class="
        horizontal
          ? ['h-2', 'top-1/2', '-translate-y-1/2']
          : ['w-2', 'left-1/2', '-translate-x-1/2']
      "
      :style="[
        seekBarStyle.front,
        horizontal
          ? { width: `${loadProgress * 100}%` }
          : { height: `${loadProgress * 100}%` }
      ]"
    ></div>
    <!-- track 播放进度条-->
    <div
      class="absolute rounded-full bg-red-500 z-10 pointer-events-none shadow-inner"
      :class="
        horizontal
          ? ['h-2', 'top-1/2', '-translate-y-1/2']
          : ['w-2', 'left-1/2', '-translate-x-1/2']
      "
      :style="[
        seekBarStyle.track,
        horizontal
          ? { width: `${progress * 100}%` }
          : { height: `${progress * 100}%` }
      ]"
    ></div>
    <!-- dot 游标-->
    <div
      class="relative w-5 h-5 rounded-full bg-red-500 z-20 cursor-pointer"
      :class="horizontal ? ['-translate-x-1/2'] : ['-translate-y-1/2']"
      :style="[
        seekBarStyle.dot,
        horizontal
          ? { left: `${progress * 100}%` }
          : { top: `${progress * 100}%` }
      ]"
      ref="dot"
      @pointerdown.prevent="pointerDown"
      @pointerup.prevent="pointerUp"
      @pointermove.prevent="pointerMove"
      @dragstart.prevent
      @touchstart.prevent
    ></div>
  </div>
</template>

<script>
import Logger from '@/utils/logger'
const Log = Logger.create('AmzSeekBar', true)

// emit: pointerMove pointerUp
export default {
  name: 'AmzSeekBar',
  props: {
    // 0 ~ 1.0
    progress: {
      type: Number,
      default: 0
    },
    // 缓冲进度 0 ~ 1.0
    loadProgress: {
      type: Number,
      default: 0
    },
    horizontal: {
      type: Boolean,
      default: true
    },
    seekBarStyle: {
      type: Object,
      default: () => ({
        background: { background: 'rgba(229, 231, 235)' },
        front: { background: 'rgba(254, 202, 202)' },
        track: { background: 'rgba(239, 68, 68)' },
        dot: { background: 'rgba(239, 68, 68)' }
      })
    },
    // 是否允许拖动进度
    canSeek: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dotOffsetRatio: 0,
    isPointerDown: false,
    // 指针按下位置到滑块左/上边沿的偏移量
    shiftBoundary: 0,
    // 进度条的最大宽度
    maxLength: 0,
    originClientPoint: 0
  }),
  watch: {
    dotOffsetRatio(newVal) {
      if (this.horizontal) {
        this.$refs.dot.style.left = newVal * 100 + '%'
      } else {
        this.$refs.dot.style.top = newVal * 100 + '%'
      }
    }
  },
  methods: {
    // 指针按下
    pointerDown(event) {
      if (!this.canSeek) {
        return
      }
      const dot = this.$refs.dot
      const background = this.$refs.background
      // 在 pointerUp 事件之前, 把所有指针事件重定向到 dot
      dot.setPointerCapture(event.pointerId)
      this.isPointerDown = true
      if (this.horizontal) {
        this.maxLength = background.offsetWidth
        this.shiftBoundary = event.clientX - dot.getBoundingClientRect().left
        this.originClientPoint =
          background.getBoundingClientRect().left - dot.offsetWidth / 2
      } else {
        this.maxLength = background.offsetHeight
        this.shiftBoundary = event.clientY - dot.getBoundingClientRect().top
        this.originClientPoint =
          background.getBoundingClientRect().top - dot.offsetHeight / 2
      }
    },
    // 指针移动
    pointerMove(event) {
      if (this.isPointerDown) {
        // 指针按下时, 滑块相对与边界的偏移量
        let curOffset = 0
        if (this.horizontal) {
          curOffset =
            event.clientX - this.shiftBoundary - this.originClientPoint
        } else {
          curOffset =
            event.clientY - this.shiftBoundary - this.originClientPoint
        }
        if (curOffset < 0) {
          curOffset = 0
        } else if (curOffset > this.maxLength) {
          curOffset = this.maxLength
        }
        this.dotOffsetRatio = curOffset / this.maxLength
        this.$emit('pointerMove', this.dotOffsetRatio)
      }
    },
    // 指针抬起
    pointerUp() {
      this.isPointerDown = false
      this.$emit('pointerUp', this.dotOffsetRatio)
    },
    // 指针点击, 进度跳跃
    skip(event) {
      if (!this.canSeek) {
        return
      }
      let originClientPoint = 0
      let maxLength = 0
      let downPoint = 0
      if (this.horizontal) {
        originClientPoint = this.$refs.background.getBoundingClientRect().left
        maxLength = this.$refs.background.offsetWidth
        downPoint = event.clientX
      } else {
        originClientPoint = this.$refs.background.getBoundingClientRect().top
        maxLength = this.$refs.background.offsetHeight
        downPoint = event.clientY
      }
      this.dotOffsetRatio = (downPoint - originClientPoint) / maxLength
      this.$emit('pointerUp', this.dotOffsetRatio)
      Log.i('skip')
    }
  }
}
</script>

<style scoped></style>
