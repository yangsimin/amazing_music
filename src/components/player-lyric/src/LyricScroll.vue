<!--
 * @Author: simonyang
 * @Date: 2022-04-06 10:38:11
 * @LastEditTime: 2022-04-11 16:05:31
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="lyric-scroll">
    <header class="text-white text-left">
      <h3 class="text-3xl font-medium">{{ playingSong.songName || '-' }}</h3>
      <p class="mt-5 text-gray-300">
        专辑:<span
          class="ml-3 mr-10 text-white cursor-pointer hover:text-red-400"
          @click="jumpAlbumDetail"
        >
          {{ album }}
        </span>
        歌手:<span
          class="mx-3 text-white cursor-pointer hover:text-red-400"
          v-for="artist in playingSong.artists"
          :key="artist.id"
          @click="jumpSingerDetail(artist.id)"
        >
          {{ artist.name }}
        </span>
      </p>
    </header>
    <section
      class="relative h-[500px] mt-5 text-gray-300 text-left text-base leading-10 overflow-y-scroll"
      ref="lyric"
    >
      <template v-for="(line, index) in lyricTexts">
        <p
          class="transition-all"
          :class="index === activeLineIndex ? activeLineClass : ''"
          v-if="line"
          :key="index"
        >
          {{ line }}
        </p>
        <p v-else :key="index">&nbsp;</p>
      </template>
    </section>
  </div>
</template>

<script>
import { getLyric } from '@/api'
import Logger from '@/utils/logger'
import AmzAudio from '@/components/player-bar/AmzAudio.js'
import { throttle } from '@/utils/performance'
import { smoothScrollTo } from '@/utils/dom'

const Log = Logger.create('LyricScroll', true)

export default {
  name: 'LyricScroll',
  props: {
    playingSong: {
      type: Object,
      default: () => ({
        songName: '',
        album: {
          id: 0,
          name: ''
        }
      })
    }
  },
  data: () => ({
    lyricTexts: [],
    lyricTimes: [],
    activeLineIndex: 0,
    activeLineClass: 'text-red-400 text-lg',
    amzAudio: null
  }),
  computed: {
    album() {
      return this.playingSong.album ? this.playingSong.album.name : '-'
    },
    artists() {
      return this.playingSong.artists
        ? this.playingSong.artists.map(artists => artists.name).join(' / ')
        : '-'
    }
  },
  methods: {
    async requestLyric() {
      this.lyricTexts.splice(0)
      this.lyricTimes.splice(0)
      const data = await getLyric(this.playingSong.id)
      Log.d(data)
      const lyricLines = data.lrc.lyric.split('\n')
      // line格式: [03:22.123]然后这部分是歌词
      // 使用正则表达获取 时间 歌词
      const regExp = /\[(.*)\](.*)/g
      lyricLines.forEach(line => {
        if (line) {
          regExp.lastIndex = 0
          const res = regExp.exec(line)
          if (res) {
            this.lyricTimes.push(this.$format.formatTimeToSecond(res[1]))
            this.lyricTexts.push(res[2] ? res[2] : '')
          } else {
            // 只有文本, 没有时间的情况
            this.lyricTimes.push(0)
            this.lyricTexts.push(line)
          }
        }
      })
      // 如果没有返回歌词
      if (!this.lyricTexts.length) {
        this.lyricTimes.push(-1)
        this.lyricTexts.push('未有歌词')
      }
      Log.d(this.lyricTexts)
      Log.d(this.lyricTimes)
    },
    timeupdate: throttle(function () {
      Log.d(this.amzAudio.getCurrentTime())
      const index = this.lyricTimes.findIndex(time => {
        return time > this.amzAudio.getCurrentTime()
      })
      // 结尾
      if (index === -1) {
        this.activeLineIndex = this.lyricTimes.length - 1
        return
      }
      this.activeLineIndex = index - 1
    }, 100),
    getScrollTop(index) {
      if (!this.$refs.lyric || !this.$refs.lyric.children[index]) {
        return 0
      }
      const containerHeight = this.$refs.lyric.offsetHeight
      const childOffsetTop = this.$refs.lyric.children[index].offsetTop
      // 滚动到屏幕上1/3处
      return childOffsetTop - containerHeight / 3
    },
    smoothScrollTo(container, top) {
      top = top <= 0 ? 0 : top
      top =
        top >= container.scrollHeight - container.offsetHeight
          ? container.scrollHeight - container.offsetHeight
          : top

      Log.d(top)
      setTimeout(() => {
        smoothScrollTo(container, top, 300)
      }, 50)

      // 存在兼容性问题
      // container.scrollTo({ left: 0, top: distance, behavior: 'smooth' })
    },
    jumpSingerDetail(id) {
      this.$router.push({
        name: 'singer-detail',
        params: {
          singerId: id
        }
      })
    },
    jumpAlbumDetail() {
      if (this.playingSong.album && this.playingSong.album.id) {
        this.$router.push({
          name: 'album',
          params: {
            albumId: this.playingSong.album.id
          }
        })
      }
    }
  },
  watch: {
    activeLineIndex(index) {
      Log.d('watch', index)
      // 首先要知道滚到哪个位置
      // 然后再加入滚动动画
      // this.smoothScrollTo(this.$refs.lyric, 1000)
      this.smoothScrollTo(this.$refs.lyric, this.getScrollTop(index))
    }
  },
  mounted() {
    this.$watch(
      () => this.playingSong,
      song => {
        if (Object.keys(song).length > 0) {
          this.requestLyric()
        } else {
          // 清空数据
          this.lyricTexts.splice(0)
          this.lyricTimes.splice(0)
        }
      },
      {
        immediate: true
      }
    )
    this.amzAudio = new AmzAudio(document.querySelector('audio'))
    this.amzAudio.addTimeupdateListener(this.timeupdate)
  },
  destroyed() {
    this.amzAudio.removeTimeupdateListener(this.timeupdate)
  }
}
</script>

<style scoped></style>
