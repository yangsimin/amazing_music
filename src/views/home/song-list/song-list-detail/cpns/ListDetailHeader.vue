<!--
 * @Author: simonyang
 * @Date: 2022-03-28 15:26:59
 * @LastEditTime: 2022-04-06 13:49:01
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="list-detail-header relative flex">
    <amz-image
      class="w-52 h-52 rounded-xl shadow-md flex-shrink-0 overflow-hidden"
      :src="$format.formatImageUrl(info.coverImgUrl, 416, 416)"
    />

    <div
      class="min-w-[18.75rem] flex-1 flex flex-col justify-around ml-7 text-gray-600"
    >
      <h3 class="truncate text-2xl font-bold text-gray-800">
        {{ info.name }}
      </h3>
      <div class="flex items-center grayscale-0">
        <amz-image
          class="w-10 rounded-full overflow-hidden"
          :src="$format.formatImageUrl(info.creator.avatarUrl, 80, 80)"
        >
          <template v-slot:placeholder>
            <img
              class="grayscale opacity-20"
              src="~@/assets/imgs/common/default_head.png"
            />
          </template>
          <template v-slot:error>
            <img
              class="grayscale opacity-20"
              src="~@/assets/imgs/common/default_head.png"
            />
          </template>
        </amz-image>
        <span class="ml-4">{{ info.creator.nickname }}</span>
        <span class="ml-6 text-gray-500">创建: {{ createTime }}</span>
      </div>
      <div>
        <span class="text-black font-bold mr-1">标签:&nbsp;</span>
        <a
          class="py-1 px-2 mr-3 bg-red-600 text-sm text-white rounded-full cursor-pointer"
          v-for="tag in info.tags"
          :key="tag"
          @click="jumpSongList(tag)"
          >{{ tag }}
        </a>
      </div>
      <div>
        <span class="text-black font-bold">歌曲数:&nbsp;</span>
        {{ info.trackCount }}
        <span class="ml-5 text-black font-bold">播放数:&nbsp;</span>
        {{ playCount }}
      </div>
      <div class="flex">
        <p class="flex-1 amz-truncate-2" :title="info.description">
          <span class="text-black font-bold">简介:&nbsp;</span>
          {{ info.description }}
        </p>
        <div
          class="self-end flex-shrink-0 w-28 bg-red-600 px-5 py-2 rounded-full text-white cursor-pointer"
          @click="$emit('playAll')"
        >
          播放全部
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logger from '@/utils/logger'
const Log = Logger.create('DetailInfo', false)

export default {
  name: 'ListDetailHeader',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    createTime() {
      Log.d('createTime', this.info.createTime)
      return this.$format.formatDate('yyyy-MM-dd', this.info.createTime)
    },
    playCount() {
      Log.d('playCount', this.info.playCount)
      const result = this.$format.formatPlayCount(this.info.playCount)
      Log.d(result)
      return result.count + result.unit
    }
  },
  methods: {
    jumpSongList(tag) {
      this.$router.push({
        name: 'song-list',
        query: {
          tag
        }
      })
    }
  }
}
</script>

<style scoped></style>
