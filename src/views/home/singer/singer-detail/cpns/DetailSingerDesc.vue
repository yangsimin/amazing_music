<!--
 * @Author: simonyang
 * @Date: 2022-04-04 16:37:53
 * @LastEditTime: 2022-04-05 16:29:33
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="detail-singer-desc px-3 min-h-screen" v-amzLoading="isLoading">
    <h3 class="text-lg font-bold mt-5 mb-3 pl-5 border-l-4 border-red-600">
      {{ title }}
    </h3>
    <p class="leading-7 whitespace-pre-line text-gray-700">
      {{ briefDesc.trim() }}
    </p>
    <section v-for="intro in introduction" :key="intro.ti">
      <h3 class="text-lg font-bold mt-5 mb-3 pl-5 border-l-4 border-red-600">
        {{ intro.ti }}
      </h3>
      <p class="leading-7 whitespace-pre-line text-gray-700">
        {{ intro.txt.trim() }}
      </p>
    </section>
  </div>
</template>

<script>
import { getArtistDesc } from '@/api'
import Logger from '@/utils/logger'

const Log = Logger.create('DetailSingerDesc')

export default {
  name: 'DetailSingerDesc',
  props: {
    id: Number
  },
  data: () => ({
    introduction: [],
    briefDesc: '',
    isLoading: false,
    title: ''
  }),
  methods: {
    async requestArtistDesc() {
      this.isLoading = true
      const data = await getArtistDesc(this.id)
      Log.d(data)
      this.introduction.push(...data.introduction)
      this.briefDesc = data.briefDesc
      this.title = '简介'
      this.isLoading = false
    }
  },
  created() {
    this.requestArtistDesc()
  }
}
</script>

<style scoped></style>
