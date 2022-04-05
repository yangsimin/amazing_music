<!--
 * @Author: simonyang
 * @Date: 2022-04-04 15:49:30
 * @LastEditTime: 2022-04-05 11:04:44
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <header class="singer-detail-header flex">
    <amz-image
      class="w-52 h-52 rounded-full shadow-md flex-shrink-0 overflow-hidden"
      :src="getImageUrl(singer.picUrl, 416, 416)"
    >
      <template v-slot:placeholder>
        <img src="~@/assets/imgs/common/default_head_singer2.png" />
      </template>
    </amz-image>

    <div
      class="min-w-[18.75rem] h-52 flex-1 flex flex-col justify-around ml-7 text-gray-600"
    >
      <h3 class="truncate text-4xl font-bold text-gray-800">
        {{ singer.name }}
        <span class="text-2xl font-normal">{{ alias }}</span>
      </h3>
      <p class="amz-truncate-3 text-base">{{ singer.briefDesc }}</p>
      <p class="flex items-end text-base space-x-5">
        <span>
          单曲<span class="ml-2 text-2xl text-black">{{
            singer.musicSize
          }}</span>
        </span>
        <span>
          专辑<span class="ml-2 text-2xl text-black">{{
            singer.albumSize
          }}</span>
        </span>
        <span>
          MV<span class="ml-2 text-2xl text-black">{{ singer.mvSize }}</span>
        </span>
        <button
          class="px-5 py-2 bg-red-600 text-white rounded-full"
          @click="playHotSongs"
        >
          播放热门歌曲
        </button>
      </p>
    </div>
  </header>
</template>

<script>
import { formatImageUrl } from '@/utils/format'

export default {
  name: 'SingerDetailHeader',
  props: {
    singer: {
      type: Object,
      required: true
    }
  },
  computed: {
    alias() {
      return this.singer.alias && `(${this.singer.alias.join('，')})`
    }
  },
  methods: {
    getImageUrl(url, width, height) {
      return formatImageUrl(url, width, height)
    },
    playHotSongs() {
      this.$emit('playHotSongs')
    }
  }
}
</script>

<style scoped></style>
