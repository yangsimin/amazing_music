<!--
 * @Author: simonyang
 * @Date: 2022-03-19 13:43:07
 * @LastEditTime: 2022-03-22 21:45:39
 * @LastEditors: simonyang
 * @Description: 音乐控制按钮(上一首, 播放/暂停, 下一首)
-->
<template>
  <div
    class="player-bar-controller flex items-center justify-between w-36"
    @click.prevent="takeAction"
  >
    <i
      class="iconfont icon-player-prev cursor-pointer media:hover:amz-text-hl before:text-3xl"
      data-action="prevClick"
    ></i>
    <i
      class="iconfont cursor-pointer media:hover:amz-text-hl before:text-3xl"
      :class="iconClass"
      data-action="playToggle"
    ></i>
    <i
      class="iconfont icon-player-next cursor-pointer media:hover:amz-text-hl before:text-3xl"
      data-action="nextClick"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'PlayerBarController',
  props: {
    isPlaying: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    iconClass() {
      return this.isPlaying ? 'icon-player-stop' : 'icon-player-play'
    }
  },
  methods: {
    takeAction(event) {
      const action = event.target.dataset.action
      if (action) {
        this.$emit(action)
      }
    }
  }
}
</script>

<style scoped></style>
