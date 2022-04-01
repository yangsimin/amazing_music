<!--
 * @Author: simonyang
 * @Date: 2022-03-31 18:06:43
 * @LastEditTime: 2022-04-01 10:34:04
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="amz-image" ref="image">
    <div class="w-full h-full" v-if="state === 1">
      <slot name="placeholder">
        <img src="~@/assets/imgs/amz-image/album_300.png" />
        <!-- PlaceHolder... -->
      </slot>
    </div>
    <div class="w-full h-full" v-if="state === -1">
      <slot name="error"
        ><img src="~@/assets/imgs/amz-image/album_300.png" />
        <!-- Failed! -->
      </slot>
    </div>
    <img
      class="w-full h-full"
      v-if="state === 0"
      v-bind="$attrs"
      :src="realSrc"
    />
  </div>
</template>

<script>
import Logger from '@/utils/logger'

// 加载失败
const ERROR = -1
// 展示 <img> 并开始加载图片
const LOAD = 0
// 展示 placeholder
const DEFAULT = 1

// 判断元素是否在可见范围内
const isVisible = (el, container, offset = 0) => {
  const containerRect = container.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()

  // 上边缘在可见范围内
  const topVisible =
    elRect.top - containerRect.top < container.offsetHeight + offset &&
    elRect.top - containerRect.top > -offset
  // 下边缘在可见范围内
  const bottomVisible =
    elRect.bottom - containerRect.top < container.offsetHeight + offset &&
    elRect.bottom - containerRect.top > -offset

  // Log.d(
  //   'topVisible',
  //   topVisible,
  //   `${elRect.top} - ${containerRect.top} < ${container.offsetHeight} + ${offset}`
  // )
  // Log.d(
  //   'topVisible',
  //   topVisible,
  //   `${elRect.top} - ${containerRect.top} > ${offset}`
  // )
  // Log.d(
  //   'bottomVisible',
  //   bottomVisible,
  //   `${elRect.bottom} - ${containerRect.top} < ${container.offsetHeight} + ${offset}`
  // )
  // Log.d(
  //   'bottomVisible',
  //   bottomVisible,
  //   `${elRect.bottom} - ${containerRect.top} > ${offset}`
  // )
  return topVisible || bottomVisible
}

const Log = Logger.create('AmzImage', true)

export default {
  name: 'AmzImage',
  inheritAttrs: false,
  props: {
    // 图片源
    src: {
      type: String,
      required: true
    },
    // 是否使用懒加载
    lazy: {
      type: Boolean,
      default: true
    },
    // 开启懒加载后,监听 scroll 的容器
    scrollContainer: {
      type: HTMLElement,
      default: () => document.body
    },
    // 触发图片加载的阈值, 元素在可见窗口外时, 距离可见窗口上下边缘的距离
    offset: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    state: DEFAULT,
    realSrc: ''
  }),
  mounted() {
    this.addListener()
  },
  destroyed() {
    this.scrollContainer.removeEventListener('scroll', this._scroll)
  },
  methods: {
    addListener() {
      if (!this.lazy) {
        // 不使用懒加载
        this.realSrc = this.src
        this.state = LOAD
        return
      }
      // 使用懒加载, 监听 scroll 事件
      this.$nextTick(() => {
        this._scroll = () => {
          // Log.d('scroll')
          if (
            this.$refs.image &&
            isVisible(this.$refs.image, this.scrollContainer, this.offset)
          ) {
            Log.d('do something')
            this.loadImage()
            this.scrollContainer.removeEventListener('scroll', this._scroll)
          }
        }
        this.scrollContainer.addEventListener('scroll', this._scroll)
        this._scroll()
      })
    },
    loadImage() {
      // 预加载图像
      const preloadImg = document.createElement('img')
      preloadImg.onerror = this.onError
      preloadImg.onload = this.onLoad
      preloadImg.src = this.src
    },
    onLoad(event) {
      Log.d('load')
      this.realSrc = this.src
      this.state = LOAD
      this.$emit('load', event)
    },
    onError(event) {
      Log.d('error')
      this.state = ERROR
      this.$emit('error', event)
    }
  },
  watch: {
    src(url) {
      Log.d('new Url', url)
      this.addListener()
    }
  }
}
</script>

<style scoped></style>
