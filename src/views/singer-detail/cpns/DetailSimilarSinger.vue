<!--
 * @Author: simonyang
 * @Date: 2022-04-04 16:38:19
 * @LastEditTime: 2022-04-05 16:29:21
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div
    class="detail-similar-singer flex flex-wrap content-start"
    @click="jumpDetail"
    v-amzLoading="isLoading"
  >
    <div
      class="singer-head w-[10%] p-2 truncate cursor-pointer transition-transform media:hover:amz-text-hl hover:shadow-md hover:-translate-y-1"
      v-for="singer in singers"
      :key="singer.id"
      :data-id="singer.id"
    >
      <amz-image
        class="w-full rounded-full overflow-hidden"
        :src="getImageUrl(singer.picUrl, 256, 256)"
      >
        <template v-slot:placeholder>
          <img src="~@/assets/imgs/common/default_head_singer.png" />
        </template>
        <template v-slot:error>
          <img src="~@/assets/imgs/common/default_head_singer.png" />
        </template>
      </amz-image>
      <div class="text-center truncate text-base">
        <span>{{ singer.name }}</span>
        <br />
        <span class="text-sm" :title="getAlias(singer.alias)">{{
          getAlias(singer.alias)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getSimilarArtist } from '@/api'
import { Singer } from '@/types/song/types'
import Logger from '@/utils/logger'
import { formatImageUrl } from '@/utils/format'

const Log = Logger.create('DetailSimilarSinger')

export default {
  name: 'DetailSimilarSinger',
  props: {
    id: Number
  },
  data: () => ({
    singers: [],
    isLoading: false
  }),
  methods: {
    async requestSimilarArtist() {
      this.isLoading = true
      const data = await getSimilarArtist(this.id)
      console.log(data)
      this.singers.push(...data.artists.map(artist => new Singer(artist)))
      this.isLoading = false
    },
    getImageUrl(url, width, height) {
      return formatImageUrl(url, width, height)
    },
    getAlias(alias) {
      if (alias.length > 0) {
        return `(${alias.join('，')})`
      }
    },
    jumpDetail(event) {
      const $singer = event.target.closest('.singer-head')
      if ($singer && $singer.dataset.id) {
        Log.d($singer.dataset.id)
        this.$router.push({
          name: 'singer-detail',
          params: {
            singerId: $singer.dataset.id
          }
        })
      }
    }
  },
  created() {
    this.requestSimilarArtist()
  }
}
</script>

<style scoped></style>
