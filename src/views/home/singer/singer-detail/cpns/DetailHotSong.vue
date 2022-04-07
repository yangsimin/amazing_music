<!--
 * @Author: simonyang
 * @Date: 2022-04-04 16:36:58
 * @LastEditTime: 2022-04-05 11:42:38
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="detail-hot-song">
    <song-list-table :songs="hotSongs" :artistsEnable="false">
      <template v-slot:songName="{ songName, song }">
        {{ songName
        }}<span v-if="song.alias.length > 0" class="ml-5 text-gray-500">{{
          song.alias.join(' / ')
        }}</span>
      </template>
    </song-list-table>
  </div>
</template>

<script>
import SongListTable from '@/components/song-list-table'

export default {
  name: 'DetailHotSong',
  components: {
    SongListTable
  },
  props: {
    hotSongs: Array,
    id: Number
  }
}
</script>

<style scoped></style>
