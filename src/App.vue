<!--
 * @Author: simonyang
 * @Date: 2022-03-11 17:31:33
 * @LastEditTime: 2022-03-29 13:33:45
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div id="app">
    <home-page />
    <!-- <test /> -->
  </div>
</template>

<script>
import HomePage from './views/home/HomePage.vue'
import Test from './Test.vue'

export default {
  name: 'app',
  components: {
    HomePage,
    Test
  }
}
</script>

<style></style>
