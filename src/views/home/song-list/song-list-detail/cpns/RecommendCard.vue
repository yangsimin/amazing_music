<!--
 * @Author: simonyang
 * @Date: 2022-03-30 08:34:51
 * @LastEditTime: 2022-04-06 13:48:30
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <card-view class="recommend-card p-4">
    <template v-slot:title>
      <h3 class="pl-4 mb-5 border-l-4 border-red-600 font-bold text-xl">
        相关歌单推荐
      </h3>
    </template>
    <div
      class="flex text-sm mt-3 cursor-pointer media:hover:amz-text-hl"
      @click="jumpDetail(songList.id)"
      v-for="songList in relatedSongLists"
      :key="songList.id"
    >
      <amz-image
        class="w-20 h-20 rounded-md overflow-hidden"
        :src="$format.formatImageUrl(songList.coverImgUrl, 160, 160)"
      />
      <div class="flex flex-col justify-between ml-2">
        <h4 class="text-base font-bold amz-truncate-2">
          {{ songList.name }}
        </h4>
        <span class="text-gray-500">
          创建人:&nbsp;&nbsp;{{ songList.creator.nickname }}
        </span>
      </div>
    </div>
  </card-view>
</template>

<script>
import CardView from '@/components/card-view'
import { getRelatedSongList } from '@/api'
import Logger from '@/utils/logger'

const Log = Logger.create('RecommendCard', false)

export default {
  name: 'RecommendCard',
  components: {
    CardView
  },
  props: {
    songListId: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    // 相关歌单推荐
    relatedSongLists: []
  }),
  methods: {
    async requestRelSongs(id) {
      const data = await getRelatedSongList(id)
      this.relatedSongLists = data.playlists
      Log.d('songLists', this.relatedSongLists)
    },
    jumpDetail(id) {
      Log.d('jumpDetail', id)
      this.$router.push({
        name: 'song-list-detail',
        params: {
          songListId: Number.parseInt(id)
        }
      })
    }
  },
  watch: {
    songListId: {
      handler: function (id) {
        Log.d('watch', id)
        if (!id) {
          return
        }
        this.requestRelSongs(id)
      },
      immediate: true
    }
  }
}
</script>

<style scoped></style>
