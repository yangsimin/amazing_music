<!--
 * @Author: simonyang
 * @Date: 2022-03-24 19:40:41
 * @LastEditTime: 2022-04-08 19:51:23
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="test h-screen">
    <div
      class="vListContainer overflow-y-scroll h-full relative"
      @scroll="scroll"
    >
      <div
        class="phantomContent"
        :style="{ position: 'absolute', transform: transformY }"
      >
        123123
      </div>
      <ul
        className="actualContent"
        :style="{ position: 'relative', height: phantomHeight + 'px' }"
      >
        <li
          class="w-full"
          v-for="(item, index) in items.slice(bufferStartIndex, endIndex + 1)"
          :key="index"
        >
          <slot :value="item" :index="bufferStartIndex + index">
            {{ bufferStartIndex + index }}
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const items = []
for (let i = 0; i < 1000; i++) {
  items.push(i)
}

export default {
  name: 'Test',
  props: {
    bufferSize: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    items,
    // 可视高度,默认为浏览器窗口大小
    rowHeight: 30,
    height: window.innerHeight,
    bufferStartIndex: 0,
    startIndex: 0,
    scrollTop: 0
  }),
  computed: {
    total() {
      return this.items.length
    },
    // 可是范围内展示元素数
    limit() {
      return Math.ceil(this.height / this.estimateHeight)
    },
    // 列表总高度
    phantomHeight() {
      return this.estimateHeight * this.total
    },
    endIndex() {
      // 可能存在 total 小于 limit 的情况, 需要判断
      return Math.min(
        this.startIndex + this.limit + this.bufferSize,
        this.total - 1
      )
    },
    transformY() {
      const { scrollTop, rowHeight, bufferSize, startIndex } = this
      return `translate3d(0, ${
        scrollTop -
        (scrollTop % rowHeight) -
        Math.min(startIndex, bufferSize) * rowHeight
      }px, 0)`
    }
  },
  methods: {
    scroll(event) {
      const { scrollTop } = event.target
      const { startIndex, rowHeight } = this

      // 计算当前 startIndex
      const currentStartIndex = Math.floor(scrollTop / rowHeight)

      if (startIndex !== currentStartIndex) {
        this.startIndex = currentStartIndex
        this.bufferStartIndex = Math.max(currentStartIndex - this.bufferSize, 0)
      }
      this.scrollTop = scrollTop
    }
  },
  created() {
    console.log(items)
  }
}
</script>

<style scoped></style>
