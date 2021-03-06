<!--
 * @Author: simonyang
 * @Date: 2022-03-31 18:06:43
 * @LastEditTime: 2022-04-11 15:54:58
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="amz-image" ref="image">
    <div class="w-full h-full" v-if="state === 1">
      <slot name="placeholder">
        <img :src="placeholderSrc" />
        <!-- PlaceHolder... -->
      </slot>
    </div>
    <div class="w-full h-full" v-if="state === -1">
      <slot name="error"
        ><img :src="errorSrc" />
        <!-- Failed! -->
      </slot>
    </div>
    <img
      class="w-full h-full"
      v-if="state === 0"
      v-bind="$attrs"
      :src="realSrc"
      :style="{ 'object-fit': fit }"
    />
  </div>
</template>

<script>
import Logger from '@/utils/logger'
import lifeCycle from '@/mixins/life-cycle'
// import { throttle } from '@/utils/performance'

// 加载失败
const ERROR = -1
// 展示 <img> 并开始加载图片
const LOAD = 0
// 展示 placeholder
const DEFAULT = 1

// 判断元素是否在可见范围内
const isVisible = (el, container, offset = 0) => {
  if (!container || !el) {
    return true
  }
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

  Log.d(
    'topVisible',
    topVisible,
    `${elRect.top} - ${containerRect.top} < ${container.offsetHeight} + ${offset}`
  )
  Log.d(
    'topVisible',
    topVisible,
    `${elRect.top} - ${containerRect.top} > ${offset}`
  )
  Log.d(
    'bottomVisible',
    bottomVisible,
    `${elRect.bottom} - ${containerRect.top} < ${container.offsetHeight} + ${offset}`
  )
  Log.d(
    'bottomVisible',
    bottomVisible,
    `${elRect.bottom} - ${containerRect.top} > ${offset}`
  )
  return topVisible || bottomVisible
}

const Log = Logger.create('AmzImage', false)

export default {
  name: 'AmzImage',
  inheritAttrs: false,
  mixins: [lifeCycle(false)],
  props: {
    // 图片源
    src: {
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
    },
    placeholderSrc: {
      type: String,
      default: require('@/assets/imgs/amz-image/default_album.png')
    },
    errorSrc: {
      type: String,
      default: require('@/assets/imgs/amz-image/default_album.png')
    },
    fit: String
  },
  data: () => ({
    state: DEFAULT,
    realSrc: '',
    isVisible: false
  }),
  methods: {
    addListener() {
      if (!this.lazy) {
        // 不使用懒加载
        this.realSrc = this.src
        this.state = LOAD
        return
      }
      // 使用懒加载, 监听 scroll 事件
      // TODO 使用节流函数优化
      this._scroll = () => {
        if (this.state === LOAD) {
          this.scrollContainer.removeEventListener('scroll', this._scroll)
          return
        }
        // Log.d('scroll')
        this.isVisible = isVisible(
          this.$refs.image,
          this.scrollContainer,
          this.offset
        )
        Log.d(this.isVisible, 'url: ', this.src)
        if (this.$refs.image && this.isVisible && this.src) {
          Log.d('do something')
          this.loadImage()
          this.scrollContainer.removeEventListener('scroll', this._scroll)
        }
      }
      this.scrollContainer.addEventListener('scroll', this._scroll, {
        passive: true
      })
      // FIXME 临时方案, 立即调用 this._scroll() 获取的 image 元素位置异常, 影响判断 isVisible
      setTimeout(() => {
        this._scroll()
      }, 200)
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
  mounted() {
    this.$watch(
      () => ({
        src: this.src,
        $image: this.$refs.image
      }),
      () => {
        this.state = DEFAULT
        this.addListener()
      },
      {
        immediate: true
      }
    )
  },
  destroyed() {
    this.scrollContainer.removeEventListener('scroll', this._scroll)
  }
}
</script>

<style scoped></style>
