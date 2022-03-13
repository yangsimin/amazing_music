<!--
 * @Author: simonyang
 * @Date: 2022-03-11 17:31:33
 * @LastEditTime: 2022-03-13 21:14:32
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div id="app">
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
