<!--
 * @Author: simonyang
 * @Date: 2022-03-14 17:58:40
 * @LastEditTime: 2022-03-16 14:58:02
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div
    class="amz-swiper relative overflow-hidden"
    ref="amzSwiper"
    @pointerdown.prevent
  >
    <div
      ref="content"
      class="content flex"
      @pointerdown.prevent="pointerdown"
      @pointerup.prevent="pointerup"
      @pointermove.prevent="pointermove"
      @dragstart.prevent
      @touchstart.prevent
    >
      <div
        v-for="img in images"
        :key="img.slice(-10)"
        class="w-full flex-shrink-0"
      >
        <img
          :src="img"
          alt=""
          class="w-full max-w-screen-lg mx-auto object-cover"
          @load.once="resize()"
        />
      </div>
    </div>
    <!-- btnControl -->
    <div v-if="btnControl">
      <div
        @click="swipe(-1)"
        class="pre absolute top-1/2 left-0 w-10 h-full transform -translate-y-1/2 overflow-hidden cursor-pointer sm:w-20"
      ></div>
      <div
        @click="swipe(1)"
        class="next absolute top-1/2 right-0 w-10 h-full transform -translate-y-1/2 overflow-hidden cursor-pointer sm:w-20"
      ></div>
    </div>

    <!-- indicator -->
    <ul
      v-if="indicator"
      class="indicator flex absolute left-1/2 bottom-4 transform -translate-x-1/2 space-x-3 px-4 py-2 rounded-full bg-black bg-opacity-30 cursor-pointer"
    >
      <li
        v-for="index in imgsLength"
        :key="index"
        class="w-2 h-2 bg-[#d9d9db] rounded-full hover:amz-bg-hl sm:w-3 sm:h-3 lg:4 lg:4"
        :class="{ 'amz-bg-hl': index - 1 === activeIndex }"
        @click="activeIndex = index - 1"
      ></li>
    </ul>
  </div>
</template>

<script>
import lifeCycleMixin from '@/utils/life-cycle'

export default {
  name: 'AmzSwiper',
  model: {
    prop: 'initIndex',
    event: 'change'
  },
  props: {
    images: {
      type: Array,
      default: () => []
    },
    // 滑动阈值
    swipeThreshold: {
      type: Number,
      default: 0.25
    },
    // 是否展示指示器
    indicator: {
      type: Boolean,
      default: true
    },
    // 是否展示控制按钮
    btnControl: {
      type: Boolean,
      default: false
    },
    // 初始化显示索引值
    initIndex: {
      type: Number,
      default: 0
    }
  },

  mixins: [lifeCycleMixin(false)],
  data: () => ({
    // 滑动容器宽度
    swiperWidth: 0,
    // 当前滑动距离
    swipeDistance: 0,
    // 手指是否按下屏幕
    isPointerDown: false,
    // 手指按下时的滑动距离
    preSwipeDistance: 0,
    // 滑动起点
    pointerStartX: 0,
    // 滑动终点
    pointerEndX: 0
  }),
  computed: {
    // 当前显示图片的索引值
    activeIndex: {
      get() {
        return this.initIndex
      },
      set(newVal) {
        this.$emit('change', newVal)
      }
    },
    imgsLength() {
      return this.images.length
    },
    contentWidth() {
      return this.swiperWidth * this.imgsLength
    }
  },
  watch: {
    activeIndex() {
      this.swipeDistance = -this.activeIndex * this.swiperWidth
      this.scroll(this.swipeDistance)
    }
  },
  methods: {
    // 以图片大小为单位滑动
    swipe(step) {
      const nextIndex = this.activeIndex + step
      if (nextIndex >= this.imgsLength || nextIndex < 0) {
        return
      }
      this.activeIndex = nextIndex
    },
    // 以像素大小为单位滑动
    scroll(distance) {
      // const transform = `translateX(${distance}px)`
      const transform = `translate3d(${distance}px,0,0)`
      this.$refs.content.style.transform = transform
      this.$refs.content.style['-webkit-transform'] = transform
      this.$refs.content.style['-ms-transform'] = transform
    },
    // 响应屏幕尺寸变化
    resize() {
      this.swiperWidth = this.$refs.amzSwiper.offsetWidth
    },
    // 手指按下
    pointerdown(event) {
      if (this.isPointerDown) {
        return
      }
      event.target.setPointerCapture(event.pointerId)
      this.isPointerDown = true
      // 记录下起点 X, 当前的滑动距离
      this.pointerStartX = event.clientX
      this.preSwipeDistance = this.swipeDistance
    },
    // 手指抬起
    pointerup(event) {
      this.isPointerDown = false
      // 鼠标没有移动
      if (event.clientX === this.pointerStartX) {
        return
      }

      // 计算滑动距离, 如果大于滑动阈值(默认0.25), 则划到下一页
      const moveDistance = this.pointerStartX - this.pointerEndX
      if (Math.abs(moveDistance) > this.swiperWidth * this.swipeThreshold) {
        if (moveDistance < 0 && this.activeIndex > 0) {
          this.activeIndex -= 1
        } else if (moveDistance > 0 && this.activeIndex < this.imgsLength - 1) {
          this.activeIndex += 1
        } else {
          this.scroll(this.preSwipeDistance)
        }
      } else {
        this.scroll(this.preSwipeDistance)
      }
      this.pointerStartX = 0
      this.pointerEndX = 0
    },
    // 手指移动
    pointermove(event) {
      if (this.isPointerDown) {
        this.pointerEndX = event.clientX
        let pointerOffset = this.pointerEndX - this.pointerStartX

        // 实现边界阻尼
        if (
          (this.activeIndex === 0 && pointerOffset > 0) ||
          (this.activeIndex === this.imgsLength - 1 && pointerOffset < 0)
        ) {
          pointerOffset *= 1 / 10
        }

        const swipeDistance = this.preSwipeDistance + pointerOffset

        this.scroll(swipeDistance)
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.resize)
  },
  destroyed() {
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style scoped>
.amz-swiper {
  touch-action: none;
}
.content {
  will-change: transform;
}

/* btnControl */
.pre {
  background: url('./imgs/arrow-left.svg') no-repeat center center/contain;
}
.next {
  background: url('./imgs/arrow-right.svg') no-repeat center center/contain;
}
.pre:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
/* indicator */
</style>
