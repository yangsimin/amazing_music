<!--
 * @Author: simonyang
 * @Date: 2022-03-28 10:53:34
 * @LastEditTime: 2022-03-28 11:37:27
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <ul class="playing-icon flex w-20 h-14 gap-x-1 overflow-hidden">
    <li v-for="index in 5" :key="index" class="w-1/12 bg-red-600"></li>
  </ul>
</template>

<script>
export default {
  name: 'PlayingIcon'
}
</script>

<style scoped>
@keyframes move {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(85%);
  }
}
.playing-icon > li {
  animation: move 1s linear infinite alternate;
}
.playing-icon > li:nth-child(1) {
  animation-delay: -1.2s;
}
.playing-icon > li:nth-child(3) {
  animation-delay: -1.5s;
}
.playing-icon > li:nth-child(4) {
  animation-delay: -0.9s;
}
.playing-icon > li:nth-child(5) {
  animation-delay: -0.6s;
}
</style>
