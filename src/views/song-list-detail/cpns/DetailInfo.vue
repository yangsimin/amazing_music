<!--
 * @Author: simonyang
 * @Date: 2022-03-28 15:26:59
 * @LastEditTime: 2022-03-28 16:42:10
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="detail-info flex">
    <img
      class="w-52 rounded-xl shadow-md flex-shrink-0"
      :src="info.coverImgUrl"
    />
    <div class="ml-10 text-gray-600">
      <h3 class="text-2xl font-bold text-gray-800">{{ info.name }}</h3>
      <div class="flex items-center mt-5">
        <img class="w-10 rounded-full" :src="info.creator.avatarUrl" />
        <span class="ml-4">{{ info.creator.nickname }}</span>
        <span class="ml-6 text-gray-500"
          >创建: {{ getDate(info.createTime) }}</span
        >
      </div>
      <div class="mt-5">
        <span class="text-black font-bold mr-1">标签:&nbsp;</span>
        <a
          class="text-sm text-white bg-red-600 py-2 px-3 mr-3 rounded-full cursor-pointer"
          v-for="tag in info.tags"
          :key="tag"
          >{{ tag }}
        </a>
      </div>
      <p class="mt-5 amz-truncate-2" :title="info.description">
        <span class="text-black font-bold">简介:&nbsp;</span>
        {{ info.description }}
      </p>
    </div>
  </div>
</template>

<script>
import { formatImageUrl, formatDate } from '@/utils/format'

export default {
  name: 'DetailInfo',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  methods: {
    getImageUrl(url, width, height) {
      return formatImageUrl(url, width, height)
    },
    getDate(timestamp) {
      return formatDate('yyyy-MM-dd', timestamp)
    }
  }
}
</script>

<style scoped></style>
