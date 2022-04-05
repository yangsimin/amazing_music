<!--
 * @Author: simonyang
 * @Date: 2022-03-14 10:26:00
 * @LastEditTime: 2022-04-05 11:47:42
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <nav class="nav-header relative">
    <div class="flex items-center text-xl" ref="tabWrapper">
      <a
        v-for="(title, index) in titles"
        :key="title"
        class="block cursor-pointer media:hover:amz-text-hl"
        :class="index === activeIndex ? activeClass : ''"
        @click="titleClick(index, $event)"
      >
        <slot :title="title">
          <span class="block w-20 mx-5 py-2 text-center">{{ title }}</span>
        </slot>
      </a>
    </div>
    <!-- indicator -->
    <div
      class="absolute left-0 -bottom-1 h-[2px] rounded-full amz-bg-hl transition-transform"
      ref="indicator"
      hidden
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
    }
  },
  watch: {
    activeIndex(index) {
      if (index < 0 || index >= this.titles.length) {
        this.$refs.indicator.hidden = true
      } else {
        const width =
          this.$refs.tabWrapper.children[index].children[0].offsetWidth
        const offsetLeft =
          this.$refs.tabWrapper.children[index].children[0].offsetLeft
        this.$refs.indicator.style.width = width + 'px'
        this.$refs.indicator.style.transform = `translate3d(${offsetLeft}px, 0, 0)`
        this.$refs.indicator.hidden = false
      }
    }
  }
}
</script>

<style scoped></style>
