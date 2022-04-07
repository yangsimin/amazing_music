<!--
 * @Author: simonyang
 * @Date: 2022-04-07 11:57:41
 * @LastEditTime: 2022-04-07 14:46:39
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="album-header flex">
    <amz-image
      class="w-52 h-52 rounded-xl shadow-md flex-shrink-0 overflow-hidden"
      :src="$format.formatImageUrl(info.picUrl, 416, 416)"
    />

    <div
      class="min-w-[18.75rem] flex-1 flex flex-col justify-around ml-7 text-gray-700"
    >
      <h3 class="truncate text-2xl font-bold text-gray-800">
        {{ info.name }}
        <span class="ml-3 text-lg text-gray-700 font-normal">{{ alias }}</span>
      </h3>
      <section>
        <p>
          <span class="text-black font-bold">歌手:</span>
          <a
            class="ml-2 font-normal cursor-pointer text-black"
            @click="jumpSingerDetail(info.artist.id)"
          >
            {{ info.artist.name }}
          </a>
        </p>
        <p class="mt-1">
          <span class="mr-2 text-black font-bold">发行时间:</span>
          {{ publishTime }}
        </p>
        <p class="mt-1">
          <span class="mr-2 text-black font-bold"> 发行公司:</span>
          {{ info.company }}
        </p>
      </section>

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
const Log = Logger.create('AlbumHeader', true)

export default {
  name: 'AlbumHeader',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    publishTime() {
      return this.$format.formatDate('yyyy-MM-dd', this.info.publishTime)
    },
    alias() {
      return this.info.alias.join(' / ')
    }
  },
  methods: {
    jumpSingerDetail(id) {
      Log.d('jumpDetail', id)
      this.$router.push({
        name: 'singer-detail',
        params: {
          singerId: id
        }
      })
    }
  }
}
</script>

<style scoped></style>
