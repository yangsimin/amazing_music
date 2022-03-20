<!--
 * @Author: simonyang
 * @Date: 2022-03-14 10:26:00
 * @LastEditTime: 2022-03-20 18:41:02
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <nav class="nav-header relative">
    <ul class="flex items-center text-xl">
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
    }
  },
  data: () => ({
    activeIndex: 0,
    activeClass: ['amz-text-hl']
  }),
  methods: {
    titleClick(index, event) {
      this.activeIndex = index
      // 发出点击事件
      this.$emit('titleClick', index)

      // 修改 indicator 位置
      const target = event.target
      this.$refs.indicator.style.transform = `translateX(${target.offsetLeft}px)`
    }
  }
}
</script>

<style scoped></style>
