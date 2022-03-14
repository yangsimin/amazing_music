<!--
 * @Author: simonyang
 * @Date: 2022-03-13 21:13:40
 * @LastEditTime: 2022-03-14 23:00:20
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div>
    <amz-header class="bg-white" />
    <router-view class="mt-2"></router-view>
  </div>
</template>

<script>
import AmzHeader from './cpns/AmzHeader.vue'
export default {
  name: 'HomePage',
  components: {
    AmzHeader
  }
}
</script>

<style scoped></style>
