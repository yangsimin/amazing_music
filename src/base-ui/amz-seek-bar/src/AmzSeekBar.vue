<!--
 * @Author: simonyang
 * @Date: 2022-03-19 18:08:25
 * @LastEditTime: 2022-03-20 23:25:32
 * @LastEditors: simonyang
 * @Description:  
-->
<template>
  <div class="AmzSeekBar relative w-11/12 mx-auto">
    <!-- background -->
    <div
      class="absolute top-1/2 -translate-y-1/2 w-full h-2 rounded-full bg-gray-300 z-0"
      ref="background"
      @click="skip"
    ></div>
    <!-- front -->
    <div
      class="absolute top-1/2 -translate-y-1/2 w-10 h-2 rounded-full bg-gray-600 z-10"
      :style="{ width: `${cacheProgress}%` }"
    ></div>
    <!-- dot -->
    <div
      class="relative -translate-x-1/2 w-5 h-5 rounded-full bg-red-400 z-20"
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
export default {
  name: 'AmzSeekBar',
  model: {
    prop: 'progress',
    event: 'updateProgress'
  },
  props: {
    // 0~100
    progress: {
      type: Number,
      default: 0
    },
    // 缓冲进度
    cacheProgress: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    dotLeftRatio: 0,
    isPointerDown: false,
    shiftX: 0, // 指针按下位置到滑块左边沿的偏移量
    maxWidth: 0, // 进度条的最大宽度
    minClientX: 0
  }),
  watch: {
    dotLeftRatio(newVal) {
      this.$refs.dot.style.left = newVal + '%'
      this.$emit('updateProgress', newVal)
    }
  },
  methods: {
    // 指针按下
    pointerDown(event) {
      const dot = this.$refs.dot
      const background = this.$refs.background
      // 在 pointerUp 事件之前, 把所有指针事件重定向到 dot
      dot.setPointerCapture(event.pointerId)
      this.isPointerDown = true
      this.maxWidth = background.offsetWidth
      this.shiftX = event.clientX - dot.getBoundingClientRect().left
      this.minClientX =
        background.getBoundingClientRect().left - dot.offsetWidth / 2
    },
    // 指针移动
    pointerMove(event) {
      if (this.isPointerDown) {
        let left = event.clientX - this.shiftX - this.minClientX
        if (left < 0) {
          left = 0
        } else if (left > this.maxWidth) {
          left = this.maxWidth
        }
        this.dotLeftRatio = (left / this.maxWidth) * 100
      }
    },
    // 指针抬起
    pointerUp() {
      this.isPointerDown = false
    },
    // 指针点击, 进度跳跃
    skip(event) {
      const minClientX = this.$refs.background.getBoundingClientRect().left
      const maxWidth = this.$refs.background.offsetWidth
      this.dotLeftRatio = ((event.clientX - minClientX) / maxWidth) * 100
    }
  }
}
</script>

<style scoped></style>
