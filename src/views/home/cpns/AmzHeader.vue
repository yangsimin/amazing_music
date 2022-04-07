<!--
 * @Author: simonyang
 * @Date: 2022-03-13 23:03:30
 * @LastEditTime: 2022-04-07 11:04:15
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <header class="amz-header flex items-center">
    <!-- logo 部分 -->
    <h1 class="flex-shrink-0">
      <a href="/" class="flex items-center h-20">
        <img
          src="~@/assets/imgs/home/logo.png"
          alt="logo"
          class="w-12 h-12 mr-2"
        />
        <p
          class="font-sans text-3xl w-0 overflow-hidden transition-all duration-200 sm:w-auto sm:pr-7"
        >
          aMazing
        </p>
      </a>
    </h1>

    <!-- 导航部分 -->
    <nav-header
      class="flex-1"
      :titles="titles"
      @titleClick="titleClick"
      :activeIndex="activeIndex"
    />

    <!-- 搜索框部分 -->
    <div>
      <i
        class="iconfont icon-search align-middle text-2xl cursor-pointer mr-2"
        @click="jumpSearch"
      />
    </div>
  </header>
</template>

<script>
import NavHeader from '@/components/nav-header'

export default {
  name: 'AmzHeader',
  components: {
    NavHeader
  },
  data: () => ({
    tabs: [
      { title: '推荐', path: '/recommend' },
      { title: '歌单', path: '/song-list' },
      { title: '排行榜', path: '/top-list' },
      { title: '歌手', path: '/singer' }
    ]
  }),
  computed: {
    titles() {
      return this.tabs.map(tab => tab.title)
    },
    activeIndex() {
      return this.tabs.findIndex(tab => this.$route.path.startsWith(tab.path))
    }
  },
  methods: {
    titleClick(index) {
      const path = this.tabs[index].path
      if (path !== this.$route.path) {
        this.$router.replace(this.tabs[index].path)
      }
    },
    jumpSearch() {
      // this.$router.push({
      //   name: 'search'
      // })
    }
  }
}
</script>

<style scoped></style>
