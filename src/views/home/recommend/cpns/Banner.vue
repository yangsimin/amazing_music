<!--
 * @Author: simonyang
 * @Date: 2022-03-16 10:53:19
 * @LastEditTime: 2022-04-11 11:55:16
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="banner flex justify-center items-center overflow-hidden">
    <ul
      class="hidden w-1/4 max-h-[350px] mr-2 cursor-pointer lg:flex lg:flex-col"
    >
      <li
        v-for="(banner, index) in banners"
        :key="banner.imageUrl.slice(-10)"
        @click="activeIndex = index"
        class="border border-transparent overflow-hidden transition-transform duration-200"
        :class="{ 'scale-[1.02]': index === activeIndex }"
        @mouseenter="activeIndex = index"
      >
        <img :src="banner.imageUrl" @click="play(banner)" />
      </li>
    </ul>
    <amz-swiper
      ref="amzSwiper"
      class="w-full max-w-5xl max-h-[350px] cursor-[grab] lg:w-3/4"
      v-model="activeIndex"
      :indicator="indicator"
      :btnControl="btnControl"
    >
      <amz-swiper-item
        v-for="banner in banners"
        :key="banner.imageUrl.slice(-10)"
        class="w-full"
      >
        <img
          :src="banner.imageUrl"
          alt=""
          class="w-full max-w-screen-lg mx-auto"
          @load.once="imgLoaded"
        />
      </amz-swiper-item>
    </amz-swiper>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { AmzSwiper, AmzSwiperItem } from '@/base-ui/amz-swiper'
import SongCover from '@/components/song-cover'

import { getSongDetail } from '@/api'
import { Song } from '@/types/song/types'
import Logger from '@/utils/logger'

const Log = Logger.create('banner')

export default {
  name: 'banner',
  components: {
    AmzSwiper,
    AmzSwiperItem,
    SongCover
  },
  props: {
    banners: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    activeIndex: 0,
    indicator: true,
    btnControl: false,
    isImgLoaded: false
  }),
  methods: {
    ...mapActions(['insertSongs']),
    imgLoaded() {
      if (!this.isImgLoaded) {
        this.$refs.amzSwiper.refreshLayout()
        this.isImgLoaded = true
      }
    },
    async play(banner) {
      let data = {}
      switch (banner.type) {
        case '新歌首发':
          data = await getSongDetail([banner.id])
          this.insertSongs(
            data.songs.map(song => Song.createFromSongList(song))
          )
          break
        case '歌单':
          this.$router.push({
            name: 'song-list-detail',
            params: {
              songListId: banner.id
            }
          })
          break
        case '新碟首发':
          this.$router.push({
            name: 'album',
            params: {
              albumId: banner.id
            }
          })
          break
      }
      Log.d('play', banner.type)
    }
  }
}
</script>

<style scoped></style>
