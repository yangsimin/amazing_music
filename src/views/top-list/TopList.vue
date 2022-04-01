<!--
 * @Author: simonyang
 * @Date: 2022-03-14 12:19:40
 * @LastEditTime: 2022-03-31 16:08:17
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="top-list flex mt-5">
    <top-list-nav class="w-[25%] flex-none">榜单</top-list-nav>
    <top-list-content class="w-[75%] pl-10 flex-none">详情</top-list-content>
  </div>
</template>

<script>
import TopListNav from './cpns/TopListNav.vue'
import TopListContent from './cpns/TopListContent.vue'

export default {
  name: 'TopList',
  components: {
    TopListNav,
    TopListContent
  }
}
</script>

<style scoped></style>
