<!--
 * @Author: simonyang
 * @Date: 2022-04-06 10:36:45
 * @LastEditTime: 2022-04-06 14:11:18
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="lyric-disc w-[310px]">
    <div class="relative overflow-hidden">
      <img
        class="needle"
        :class="isPlaying ? '' : 'needle-pause'"
        src="~@/assets/imgs/player-lyric/play_needle_2x.png"
      />
      <div class="disc" :class="isPlaying ? 'disc-rolling' : ''">
        <img
          class="w-[310px] h-[310px]"
          src="~@/assets/imgs/player-lyric/play_disc_2x.png"
        />
        <img
          v-show="src"
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full"
          :src="src"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LyricDisc',
  props: {
    isPlaying: Boolean,
    src: String
  }
}
</script>

<style scoped>
.needle {
  transform-origin: 25px 24px;
  @apply absolute left-1/2 w-[130px] h-[167px] ml-[-25px] transition-transform duration-500 z-20;
}
.needle-pause {
  transform: rotateZ(-30deg);
}
@keyframes roll {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.disc {
  animation: 40s linear infinite roll;
  animation-play-state: paused;
  @apply relative w-[310px] h-[310px] mx-auto mt-[95px];
}
.disc-rolling {
  animation-play-state: running;
}
</style>
