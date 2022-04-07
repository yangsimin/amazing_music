<!--
 * @Author: simonyang
 * @Date: 2022-04-01 11:53:05
 * @LastEditTime: 2022-04-05 23:38:17
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="singer mt-5">
    <singer-filter
      class="mx-auto"
      :activeInitial="activeInitial"
      :activeType="activeType"
      :activeArea="activeArea"
      @tagChange="tagChange"
    ></singer-filter>
    <singer-content
      class="mt-5"
      :activeInitial="activeInitial"
      :activeType="activeType"
      :activeArea="activeArea"
    ></singer-content>
  </div>
</template>

<script>
import SingerFilter from './cpns/SingerFilter.vue'
import SingerContent from './cpns/SingerContent.vue'

import restoreScroll from '@/mixins/restore-scroll'

export default {
  name: 'Singer',
  mixins: [restoreScroll],
  components: {
    SingerFilter,
    SingerContent
  },
  data: () => ({
    activeInitial: '-1',
    activeType: -1,
    activeArea: -1
  }),
  methods: {
    tagChange(type, code) {
      if (type === 'initial') {
        this.activeInitial = code
      } else if (type === 'type') {
        this.activeType = Number(code)
      } else if (type === 'area') {
        this.activeArea = Number(code)
      }
    }
  }
}
</script>

<style scoped></style>
