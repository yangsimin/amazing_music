<!--
 * @Author: simonyang
 * @Date: 2022-03-17 20:18:12
 * @LastEditTime: 2022-03-17 23:00:57
 * @LastEditors: simonyang
 * @Description: 歌曲封面, 依赖 iconfront
-->
<template>
  <div class="song-cover overflow-hidden" @click="playMusic">
    <img class="w-full transition duration-300" :src="img" alt="" />
  </div>
</template>

<script>
export default {
  name: 'SongCover',
  props: {
    img: {
      type: String,
      required: true
    }
  },
  methods: {
    playMusic() {
      this.$emit('play-music')
    }
  }
}
</script>

<style scoped>
.song-cover {
  position: relative;
}
.song-cover:hover img {
  transform: scale(1.1);
}
/* 播放图标 */
.song-cover::before {
  content: '\e611';
  font-family: 'iconfont' !important;
  font-size: 2.5rem;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text-hl);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  z-index: 9;
  transition: all 0.3s;
}
.song-cover:hover::before {
  opacity: 1;
  transform: scale(1.2);
}
</style>
