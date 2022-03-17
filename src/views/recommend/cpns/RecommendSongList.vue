<!--
 * @Author: simonyang
 * @Date: 2022-03-17 22:25:33
 * @LastEditTime: 2022-03-17 23:10:27
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="recommend-song-list">
    <h2 class="text-2xl font-bold mt-8 mb-4">推荐歌单</h2>
    <div class="flex justify-between flex-wrap -mx-2">
      <song-list-item
        class="w-1/3 p-2 sm:w-1/4 md:w-1/6"
        v-for="index in 12"
        :key="index"
      ></song-list-item>
    </div>
  </div>
</template>

<script>
import SongListItem from './SongListItem.vue'

export default {
  name: 'RecommendSongList',
  components: {
    SongListItem
  }
}
</script>

<style scoped></style>
