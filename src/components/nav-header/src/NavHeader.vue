<!--
 * @Author: simonyang
 * @Date: 2022-03-14 10:26:00
 * @LastEditTime: 2022-03-30 23:33:53
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <nav class="nav-header relative">
    <ul class="flex items-center text-xl" ref="tabWrapper">
      <li
        v-for="(title, index) in titles"
        :key="title"
        class="block w-20 py-2 rounded-sm text-center cursor-pointer media:hover:amz-text-hl"
        :class="index === activeIndex ? activeClass : ''"
        @click="titleClick(index, $event)"
      >
        {{ title }}
      </li>
    </ul>
    <!-- indicator -->
    <div
      class="absolute left-0 -bottom-1 w-20 h-[2px] rounded-full amz-bg-hl transition-all"
      ref="indicator"
    ></div>
  </nav>
</template>

<script>
export default {
  name: 'NavHeader',
  props: {
    titles: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    activeClass: ['amz-text-hl']
  }),
  methods: {
    titleClick(index) {
      // 发出点击事件
      this.$emit('titleClick', index)
      console.log()
    }
  },
  watch: {
    activeIndex(index) {
      if (index < 0 || index >= this.titles.length) {
        this.$refs.indicator.hidden = true
      } else {
        const offsetLeft = this.$refs.tabWrapper.children[index].offsetLeft
        this.$refs.indicator.style.transform = `translateX(${offsetLeft}px)`
        this.$refs.indicator.hidden = false
      }
    }
  }
}
</script>

<style scoped></style>
