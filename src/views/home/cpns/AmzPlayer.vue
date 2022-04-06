<!--
 * @Author: simonyang
 * @Date: 2022-03-19 13:06:21
 * @LastEditTime: 2022-04-06 22:03:40
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div
    class="amz-player fixed bottom-0 left-0 right-0 h-28 bg-black bg-opacity-30 md:h-20 z-10"
  >
    <div class="absolute left-0 bottom-0 w-full bg-white bg-opacity-95 z-30">
      <player-bar
        class="amz-max-width mx-auto"
        :isLyricShow="isLyricShow"
        @toggleLyric="toggleLyric"
      ></player-bar>
    </div>
    <!-- 歌词页面 -->
    <transition name="lyric">
      <player-lyric
        class="fixed left-0 top-0 right-0 bottom-0 bg-gray-700 bg-opacity-[0.95] backdrop-blur-lg overflow-hidden z-20"
        v-if="isLyricShow"
        @close="closeLyric"
      ></player-lyric>
    </transition>
  </div>
</template>

<script>
import PlayerBar from '@/components/player-bar'
import PlayerLyric from '@/components/player-lyric'
import lifeCycle from '@/mixins/life-cycle'

export default {
  name: 'AmzPlayer',
  components: {
    PlayerBar,
    PlayerLyric
  },
  mixins: [lifeCycle()],
  data: () => ({
    isLyricShow: false
  }),
  methods: {
    toggleLyric() {
      this.isLyricShow = !this.isLyricShow
    },
    closeLyric() {
      this.isLyricShow = false
    }
  }
}
</script>

<style scoped>
.lyric-enter-active,
.lyric-leave-active {
  @apply transition-all duration-500 ease-in-out;
}

.lyric-enter,
.lyric-leave-to {
  @apply opacity-0 translate-y-full;
}
</style>
