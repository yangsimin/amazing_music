<!--
 * @Author: simonyang
 * @Date: 2022-03-16 15:00:07
 * @LastEditTime: 2022-03-17 22:32:51
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="recommendNewSongs">
    <h2 class="text-2xl font-bold mt-8 mb-4">推荐新歌</h2>
    <div class="flex flex-wrap items-center -mx-4 h-[40rem] sm:h-[20rem]">
      <song-item
        v-for="song in songs"
        :key="song.id"
        :song="song"
        class="w-full px-4 sm:w-1/2"
      ></song-item>
    </div>
  </div>
</template>

<script>
import SongItem from './SongItem.vue'

export default {
  name: 'RecommendNewSongs',
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  components: {
    SongItem
  }
}
</script>

<style scoped></style>
