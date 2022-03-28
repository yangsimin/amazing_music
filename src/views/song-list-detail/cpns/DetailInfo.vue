<!--
 * @Author: simonyang
 * @Date: 2022-03-28 15:26:59
 * @LastEditTime: 2022-03-28 21:08:11
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="detail-info flex">
    <img
      class="w-52 h-52 rounded-xl shadow-md flex-shrink-0"
      :src="getImageUrl(info.coverImgUrl, 416, 416)"
    />
    <div class="flex flex-col justify-around ml-7 text-gray-600">
      <h3 class="text-2xl font-bold text-gray-800">{{ info.name }}</h3>
      <div class="flex items-center">
        <img
          class="w-10 rounded-full"
          :src="getImageUrl(info.creator.avatarUrl, 80, 80)"
        />
        <span class="ml-4">{{ info.creator.nickname }}</span>
        <span class="ml-6 text-gray-500">创建: {{ createTime }}</span>
      </div>
      <div>
        <span class="text-black font-bold mr-1">标签:&nbsp;</span>
        <a
          class="py-1 px-2 mr-3 bg-red-600 text-sm text-white rounded-full cursor-pointer"
          v-for="tag in info.tags"
          :key="tag"
          >{{ tag }}
        </a>
      </div>
      <div>
        <span class="text-black font-bold">歌曲数:&nbsp;</span>
        {{ info.trackCount }}
        <span class="ml-5 text-black font-bold">播放数:&nbsp;</span>
        {{ playCount }}
      </div>
      <p class="amz-truncate-2" :title="info.description">
        <span class="text-black font-bold">简介:&nbsp;</span>
        {{ info.description }}
      </p>
    </div>
  </div>
</template>

<script>
import { formatImageUrl, formatDate, formatPlayCount } from '@/utils/format'

export default {
  name: 'DetailInfo',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    createTime() {
      console.log('createTime', this.info.createTime)
      return formatDate('yyyy-MM-dd', this.info.createTime)
    },
    playCount() {
      console.log('playCount', this.info.playCount)
      const result = formatPlayCount(this.info.playCount)
      console.log(result)
      return result.count + result.unit
    }
  },
  methods: {
    getImageUrl(url, width, height) {
      return formatImageUrl(url, width, height)
    }
  }
}
</script>

<style scoped></style>
