<!--
 * @Author: simonyang
 * @Date: 2022-03-17 22:33:38
 * @LastEditTime: 2022-03-17 23:07:49
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="song-list-item w-full">
    <song-cover
      class="rounded-lg cursor-pointer"
      img="https://qpic.y.qq.com/music_cover/oMphCibDIicibO3ibh8tztPnIp3nianPqnFE9GsAKLibNo1yhsfzAvQ9L4aw/300?n=1"
    ></song-cover>
    <h3 class="mt-4 text-sm cursor-pointer">暴露年龄! 学生时代MP3里听的歌</h3>
    <p class="mt-2 text-sm text-gray-500">播放量：2.4亿</p>
  </div>
</template>

<script>
import SongCover from '@/components/song-cover'

export default {
  name: 'SongListItem',
  components: {
    SongCover
  }
}
</script>

<style scoped>
.song-cover::before {
  font-size: 50px;
}
</style>
