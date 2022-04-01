<!--
 * @Author: simonyang
 * @Date: 2022-03-31 15:28:02
 * @LastEditTime: 2022-04-01 10:39:53
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="content-info relative flex">
    <amz-image
      class="w-52 h-52 rounded-xl shadow-md flex-shrink-0 overflow-hidden"
      :src="getImageUrl(listInfo.coverImgUrl, 416, 416)"
    ></amz-image>

    <div
      class="min-w-[18.75rem] flex-1 flex flex-col justify-around ml-7 text-gray-600"
    >
      <h3 class="truncate text-4xl font-bold text-gray-800">
        {{ listInfo.name }}
      </h3>
      <div class="flex items-center">
        <span class="text-black font-bold">最近更新:&nbsp;</span>
        {{ updateTime }}&nbsp;({{ listInfo.updateFrequency }})
      </div>
      <div>
        <span class="text-black font-bold">播放数:&nbsp;</span>
        {{ playCount }}
      </div>
      <div class="flex">
        <p class="flex-1 amz-truncate-2" :title="listInfo.description">
          <span class="text-black font-bold">简介:&nbsp;</span>
          {{ listInfo.description }}
        </p>
        <div
          class="self-end flex-shrink-0 w-28 bg-red-600 px-5 py-2 rounded-full text-white cursor-pointer"
          @click="$emit('play-all')"
        >
          播放全部
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatImageUrl, formatDate, formatPlayCount } from '@/utils/format'
import Logger from '@/utils/logger'
const Log = Logger.create('DetailInfo', false)

export default {
  name: 'DetailInfo',
  props: {
    listInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    updateTime() {
      Log.d('updateTime', this.listInfo.updateTime)
      return formatDate('yyyy-MM-dd', this.listInfo.updateTime)
    },
    playCount() {
      Log.d('playCount', this.listInfo.playCount)
      const result = formatPlayCount(this.listInfo.playCount)
      Log.d(result)
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
