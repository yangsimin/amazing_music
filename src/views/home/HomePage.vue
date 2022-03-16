<!--
 * @Author: simonyang
 * @Date: 2022-03-13 21:13:40
 * @LastEditTime: 2022-03-16 21:07:36
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div>
    <amz-header class="bg-white" />
    <keep-alive>
      <router-view class="mt-2"></router-view>
    </keep-alive>
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
