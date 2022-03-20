<!--
 * @Author: simonyang
 * @Date: 2022-03-19 17:31:32
 * @LastEditTime: 2022-03-20 10:00:35
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="player-progress-bar">
    <div>info</div>
    <amz-progress-bar></amz-progress-bar>
  </div>
</template>

<script>
import AmzProgressBar from '@/base-ui/amz-progress-bar'
export default {
  name: 'PlayerProgressBar',
  components: {
    AmzProgressBar
  }
}
</script>

<style scoped></style>
