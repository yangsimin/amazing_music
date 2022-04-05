<!--
 * @Author: simonyang
 * @Date: 2022-04-05 17:58:19
 * @LastEditTime: 2022-04-05 18:29:44
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="search-bar bg-white">
    <input
      class="w-[554px] h-12 px-5 text-base outline-none"
      type="text"
      placeholder="搜索音乐、歌单、专辑、歌手"
      ref="input"
    />
    <button class="iconfont icon-search h-12 px-3 before:text-lg"></button>
    <div class="absolute">
      <div>单曲</div>
      <div>歌手</div>
      <div>专辑</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar'
}
</script>

<style scoped></style>
