<!--
 * @Author: simonyang
 * @Date: 2022-03-31 09:28:00
 * @LastEditTime: 2022-04-02 18:14:37
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <nav class="top-list-nav">
    <nav-card
      title="云音乐特色榜"
      :top-list="cloudTopList"
      :active-id="activeId"
      @id-change="idChange"
    ></nav-card>
    <nav-card
      class="mt-5"
      title="全球媒体榜"
      :top-list="globalTopList"
      :active-id="activeId"
      @id-change="idChange"
    ></nav-card>
  </nav>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import NavCard from './NavCard.vue'

import Logger from '@/utils/logger'
import { getTopList } from '@/api'
import { SongList, ListInfo } from '@/types/song/types'

const Log = Logger.create('TopListNav')

export default {
  name: 'TopListNav',
  components: {
    NavCard
  },
  data: () => ({
    songLists: [],
    listInfos: []
  }),
  computed: {
    ...mapState('topList', ['activeId']),
    cloudTopList() {
      return this.songLists.filter(list => list.topListType)
    },
    globalTopList() {
      return this.songLists.filter(list => !list.topListType)
    }
  },
  methods: {
    ...mapMutations('topList', ['changeActiveId', 'changeListInfo']),
    async requestTopList() {
      const data = await getTopList()
      Log.d(data)
      this.listInfos = data.list.map(origin => new ListInfo(origin))
      // this.changeListInfo(new ListInfo(data))
      this.songLists = data.list.map(origin => new SongList(origin))
      this.changeActiveId(this.cloudTopList[0].id)
      this.changeListInfo(
        this.listInfos.find(listInfo => listInfo.id === this.activeId)
      )
    },
    idChange(id) {
      Log.d('id-change', id)
      this.changeActiveId(id)
      this.changeListInfo(this.listInfos.find(listInfo => listInfo.id === id))
    }
  },
  created() {
    this.requestTopList()
  }
}
</script>

<style scoped></style>
