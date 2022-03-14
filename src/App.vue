<!--
 * @Author: simonyang
 * @Date: 2022-03-11 17:31:33
 * @LastEditTime: 2022-03-14 17:26:47
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div id="app" class="px-3 min-w-[285px]">
    <home-page />
  </div>
</template>

<script>
import HomePage from './views/home/HomePage.vue'

export default {
  name: 'app',
  components: {
    HomePage
  }
}
</script>

<style></style>
