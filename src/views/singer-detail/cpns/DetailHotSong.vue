<!--
 * @Author: simonyang
 * @Date: 2022-04-04 16:36:58
 * @LastEditTime: 2022-04-04 18:08:18
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="detail-hot-song">Hot Song {{ id }} {{ hotSongs }}</div>
</template>

<script>
export default {
  name: 'DetailHotSong',
  props: {
    hotSongs: Array,
    id: Number
  }
}
</script>

<style scoped></style>
