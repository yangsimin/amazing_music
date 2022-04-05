<!--
 * @Author: simonyang
 * @Date: 2022-04-05 17:38:32
 * @LastEditTime: 2022-04-05 18:03:26
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="search">
    <section class="flex flex-col items-center justify-center h-64 bg-red-100">
      <search-bar></search-bar>
      <p>热门搜索</p>
    </section>
  </div>
</template>

<script>
import SearchBar from './cpns/SearchBar.vue'

export default {
  name: 'Search',
  components: {
    SearchBar
  }
}
</script>

<style scoped></style>
