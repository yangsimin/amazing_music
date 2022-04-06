<!--
 * @Author: simonyang
 * @Date: 2022-04-01 16:13:16
 * @LastEditTime: 2022-04-06 13:53:36
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div
    class="singer-content flex flex-wrap"
    v-amzLoading="isLoading"
    v-infinite-scroll="loadMore"
    @click="jumpDetail"
  >
    <div
      class="singer-head w-[10%] p-2 truncate cursor-pointer transition-transform media:hover:amz-text-hl hover:shadow-md hover:-translate-y-1"
      v-for="singer in singers"
      :key="singer.id"
      :data-id="singer.id"
    >
      <amz-image
        class="w-full rounded-full overflow-hidden"
        :src="$format.formatImageUrl(singer.picUrl, 256, 256)"
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
// TODO 请求添加防抖
import { getArtistList } from '@/api'
import Logger from '@/utils/logger'
import { debounce } from '@/utils/performance'

const Log = Logger.create('SingerContent', false)

export default {
  name: 'SingerContent',
  props: {
    activeInitial: {
      type: String,
      default: '-1'
    },
    activeType: {
      type: Number,
      default: -1
    },
    activeArea: {
      type: Number,
      default: -1
    }
  },
  data: () => ({
    page: 0,
    limit: 40,
    singers: [],
    more: false,
    isLoading: false
  }),
  methods: {
    requestSingers: debounce(async function (initial, type, area, page, limit) {
      this.isLoading = true
      Log.d('request', initial, type, area, page, limit)
      const data = await getArtistList(initial, type, area, page * limit, limit)
      Log.d(data)
      this.singers.push(
        ...data.artists.map(artist => ({
          id: artist.id,
          name: artist.name,
          picUrl: artist.img1v1Url,
          alias: artist.alias
        }))
      )
      this.more = data.more
      this.isLoading = false
    }, 500),
    loadMore() {
      Log.d('enter loadMore')
      if (this.more) {
        this.page += 1
        this.requestSingers(
          this.activeInitial,
          this.activeType,
          this.activeArea,
          this.page,
          this.limit
        )
      }
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
  mounted() {
    this.$watch(
      function () {
        return {
          initial: this.activeInitial,
          type: this.activeType,
          area: this.activeArea
        }
      },
      function (params) {
        Log.d('watch', params)
        // 当过滤标签变化时, 重置页码, 清空 singers
        this.page = 0
        this.singers.splice(0)

        this.requestSingers(
          params.initial,
          params.type,
          params.area,
          this.page,
          this.limit
        )
      },
      {
        deep: true,
        immediate: true
      }
    )
  }
}
</script>

<style scoped></style>
