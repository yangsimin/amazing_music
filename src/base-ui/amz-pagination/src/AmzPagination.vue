<!--
 * @Author: simonyang
 * @Date: 2022-03-30 15:15:52
 * @LastEditTime: 2022-03-30 22:15:25
 * @LastEditors: simonyang
 * @Description: 
      emits: ['prev-click', 'next-click', 'current-change']
-->
<template>
  <div class="amz-pagination flex items-center" @click="takeAction">
    <span class="text-gray-600 mr-5">共 {{ total }} 条</span>
    <button
      class="button iconfont icon-prev-page"
      :class="{ disable: currentPage === 1 }"
      :disabled="currentPage === 1"
      data-action="prev-click"
    ></button>
    <ul class="flex" v-if="sumPage > pagerCount">
      <li
        class="num"
        :class="[currentPage === 1 ? activeClass : '']"
        data-page="1"
      >
        1
      </li>
      <li class="more iconfont icon-ellipsis" v-if="currentPage > leftMax"></li>
      <li
        class="num"
        :class="[currentPage === index ? activeClass : '']"
        v-for="index in centerPages"
        :key="index"
        :data-page="index"
      >
        {{ index }}
      </li>
      <li
        class="more iconfont icon-ellipsis"
        v-if="currentPage < rightMax"
      ></li>
      <li
        class="num"
        :class="[currentPage === sumPage ? activeClass : '']"
        :data-page="sumPage"
      >
        {{ sumPage }}
      </li>
    </ul>
    <ul class="flex" v-else>
      <li
        class="num"
        :class="[currentPage === index ? activeClass : '']"
        v-for="index in sumPage"
        :key="index"
        :data-page="index"
      >
        {{ index }}
      </li>
    </ul>
    <button
      class="button iconfont icon-next-page"
      :class="{ disable: currentPage === sumPage }"
      :disabled="currentPage === sumPage"
      data-action="next-click"
    ></button>
  </div>
</template>

<script>
import { range } from '@/utils/number'
import Logger from '@/utils/logger'

const Log = Logger.create('AmzPagination', false)

export default {
  name: 'AmzPagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pagerCount: {
      type: Number,
      default: 7
    }
  },
  data: () => ({
    activeClass: ['!bg-red-600', '!text-white']
  }),
  computed: {
    sumPage() {
      if (this.pageSize === 0) {
        return 0
      }
      return Math.ceil(this.total / this.pageSize)
    },
    // 可展示的页面数, 去掉头尾2个固定页面, 再平分
    half() {
      return Math.floor((this.pagerCount - 2) / 2)
    },
    // 左侧不省略时可选中的最大页数
    leftMax() {
      return 2 + this.half
    },
    // 右侧不省略时可选中的最大页数
    rightMax() {
      return this.sumPage - 1 - this.half
    },
    centerPages() {
      const pages = []
      if (this.currentPage <= this.leftMax) {
        pages.push(...range(2, this.leftMax + this.half + 1))
      } else if (this.currentPage >= this.rightMax) {
        pages.push(...range(this.rightMax - this.half, this.sumPage))
      } else {
        pages.push(
          ...range(
            this.currentPage - this.half,
            this.currentPage + this.half + 1
          )
        )
      }
      Log.d(pages)
      return pages
    }
  },
  methods: {
    takeAction(event) {
      if (!event.target.dataset) {
        return
      }
      // 处理 上一页 / 下一页 的点击事件
      if (event.target.dataset.action) {
        this.$emit(event.target.dataset.action)
      }
      // 处理页码点击事件
      if (event.target.dataset.page) {
        this.$emit('current-change', Number.parseInt(event.target.dataset.page))
      }
    }
  }
}
</script>

<style scoped>
.num,
.more,
.button {
  @apply mx-1 w-10 py-1 bg-gray-100 rounded-md text-gray-600 text-center;
}
.num {
  @apply cursor-pointer;
}

.icon-prev-page::before,
.icon-next-page::before {
  @apply text-gray-600 text-base;
}

.disable {
  @apply cursor-auto;
}
.disable::before {
  @apply text-gray-300;
}
</style>
