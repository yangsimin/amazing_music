<!--
 * @Author: simonyang
 * @Date: 2022-03-19 13:44:02
 * @LastEditTime: 2022-04-06 22:02:54
 * @LastEditors: simonyang
 * @Description: 歌词布局
-->
<template>
  <div class="player-lyric">
    <div class="h-14 amz-max-width mx-auto">
      <i
        class="iconfont icon-arrow-down float-right mr-10 mt-5 cursor-pointer before:text-white before:text-2xl"
        @click="close"
      ></i>
    </div>
    <div class="flex w-full h-full amz-max-width mx-auto">
      <div class="w-5/12">
        <lyric-disc
          class="scale-[1.4] mx-auto mt-20"
          :src="$format.formatImageUrl(playingSong.picUrl, 400, 400)"
          :isPlaying="isPlaying"
        ></lyric-disc>
      </div>
      <lyric-scroll
        class="w-7/12 px-20"
        :playingSong="playingSong"
      ></lyric-scroll>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LyricDisc from './LyricDisc.vue'
import LyricScroll from './LyricScroll.vue'
import lifeCycle from '@/mixins/life-cycle'

export default {
  name: 'PlayerLyric',
  components: {
    LyricDisc,
    LyricScroll
  },
  mixins: [lifeCycle()],
  computed: {
    ...mapGetters(['playingSong', 'isPlaying'])
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped></style>
