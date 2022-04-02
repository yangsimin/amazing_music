<!--
 * @Author: simonyang
 * @Date: 2022-04-01 11:53:05
 * @LastEditTime: 2022-04-02 14:04:32
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

export default {
  name: 'Singer',
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
