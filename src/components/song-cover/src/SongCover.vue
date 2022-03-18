<!--
 * @Author: simonyang
 * @Date: 2022-03-17 20:18:12
 * @LastEditTime: 2022-03-18 00:02:26
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
/* 当支持 hover 时才显示 hover 样式, 解决移动端 hover 样式无法取消问题 */
@media screen and (any-hover: hover) {
  .song-cover:hover img {
    transform: scale(1.1);
  }
  .song-cover:hover::before {
    opacity: 1;
    transform: scale(1.2);
  }
}

@media screen and (any-hover: none) {
  .song-cover:active img {
    transform: scale(0.95);
  }
}
</style>
