<!--
 * @Author: simonyang
 * @Date: 2022-04-08 16:10:46
 * @LastEditTime: 2022-04-08 17:52:05
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="amz-recycler-view">
    <div class="overflow-y-scroll h-full" @scroll="scroll">
      <ul :style="{ position: 'relative', height: phantomHeight + 'px' }">
        <li
          class="w-full"
          v-for="(item, index) in items.slice(bufferStartIndex, endIndex + 1)"
          :key="index"
          :style="{
            position: 'absolute',
            height: rowHeight + 'px',
            top: (bufferStartIndex + index) * rowHeight + 'px'
          }"
        >
          <slot :value="item" :index="bufferStartIndex + index">123</slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AmzRecyclerView',
  props: {
    items: Array,
    rowHeight: Number,
    // 可视窗口高度
    height: Number,
    bufferSize: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    bufferStartIndex: 0,
    startIndex: 0
  }),
  computed: {
    total() {
      return this.items.length
    },
    // 可是范围内展示元素数
    limit() {
      return Math.ceil(this.height / this.rowHeight)
    },
    // 列表总高度
    phantomHeight() {
      return this.rowHeight * this.total
    },
    endIndex() {
      // 可能存在 total 小于 limit 的情况, 需要判断
      return Math.min(
        this.startIndex + this.limit + this.bufferSize,
        this.total - 1
      )
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
    }
  }
}
</script>

<style scoped></style>
