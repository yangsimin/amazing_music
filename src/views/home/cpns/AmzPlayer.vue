<!--
 * @Author: simonyang
 * @Date: 2022-03-19 13:06:21
 * @LastEditTime: 2022-03-28 22:53:58
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
import PlayerBar from '@/components/player-bar'
// import PlayerLyric from '@/components/player-lyric'

export default {
  name: 'AmzPlayer',
  components: {
    PlayerBar
    // PlayerLyric
  },
  methods: {},
  mounted() {}
}
</script>

<style scoped></style>
