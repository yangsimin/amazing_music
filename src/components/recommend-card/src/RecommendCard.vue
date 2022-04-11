<!--
 * @Author: simonyang
 * @Date: 2022-04-07 14:03:05
 * @LastEditTime: 2022-04-11 11:17:30
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <card-view class="recommend-card p-4">
    <template v-slot:title>
      <slot name="title" :value="title">
        <h3 class="pl-4 mb-5 border-l-4 border-red-600 font-bold text-xl">
          {{ title }}
        </h3>
      </slot>
    </template>
    <div
      class="flex text-sm mt-3 cursor-pointer media:hover:amz-text-hl"
      @click="jumpDetail(songList)"
      v-for="songList in relatedSongLists"
      :key="songList.id"
    >
      <slot name="image" :value="songList.coverImgUrl" :item="songList">
        <amz-image
          class="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden"
          :src="$format.formatImageUrl(songList.coverImgUrl, 160, 160)"
        />
      </slot>

      <div class="flex flex-col justify-between ml-2">
        <slot name="songName" :value="songList.name" :item="songList">
          <h4 class="text-base font-bold amz-truncate-2">
            {{ songList.name }}
          </h4>
        </slot>
        <slot name="creatorName" :value="songList.creatorName" :item="songList">
          <span class="text-gray-500">
            创建人:&nbsp;&nbsp;{{ songList.creatorName }}
          </span>
        </slot>
      </div>
    </div>
  </card-view>
</template>

<script>
import CardView from '@/components/card-view'
import Logger from '@/utils/logger'

const Log = Logger.create('RecommendCard', false)

export default {
  name: 'RecommendCard',
  components: {
    CardView
  },
  props: {
    // 相关歌单推荐
    // {id, coverImgUrl, name, creatorName}
    relatedSongLists: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: '相关歌单推荐'
    }
  },
  methods: {
    jumpDetail(songList) {
      Log.d('jumpDetail', songList)
      this.$emit('jumpDetail', songList)
    }
  }
}
</script>

<style scoped></style>
