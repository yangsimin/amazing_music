<!--
 * @Author: simonyang
 * @Date: 2022-03-19 13:06:21
 * @LastEditTime: 2022-03-21 17:00:45
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div
    class="amz-player fixed bottom-0 left-0 right-0 h-28 bg-black bg-opacity-30 md:h-20 z-10"
  >
    <div class="absolute left-0 bottom-0 w-full bg-white bg-opacity-95">
      <player-bar class="amz-max-width mx-auto"></player-bar>
    </div>
    <!-- <player-lyric></player-lyric> -->
  </div>
</template>

<script>
import PlayerBar from './PlayerBar.vue'
// import PlayerLyric from './PlayerLyric.vue'

export default {
  name: 'AmzPlayer',
  components: {
    PlayerBar
    // PlayerLyric
  },
  methods: {},
  mounted() {
    this.$store.commit('insertSongs', [
      {
        id: 64874,
        duration: 226000,
        songName: '歌·颂',
        artists: ['陈奕迅']
      }
      // {
      //   id: 111,
      //   duration: 120000,
      //   songName: '富士山下',
      //   artists: ['陈奕迅']
      // }
    ])
  }
}
</script>

<style scoped></style>
