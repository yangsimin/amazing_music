<!--
 * @Author: simonyang
 * @Date: 2022-03-14 12:19:27
 * @LastEditTime: 2022-03-16 14:58:23
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="amz-recommend">
    <banner :images="images" />
  </div>
</template>

<script>
import Banner from './cpns/Banner.vue'

export default {
  name: 'AmzRecommend',
  components: {
    Banner
  },
  data: () => ({
    images: []
  }),
  methods: {
    // 请求 Banner 数据
    async getBanner() {
      const data = await this.$api.getBanner()
      const images = data.banners.map(banner => banner.imageUrl)
      // 布局限制, 只去前三张图
      images.splice(3)
      this.images.push(...images)
    },
    // 请求推荐歌单数据
    async getPersonalized() {
      const data = await this.$api.getPersonalized()
      console.log('歌单', data)
    },
    // 请求推荐新音乐
    async getPersonalizedNewSong() {
      const data = await this.$api.getPersonalizedNewSong()
      console.log('新音乐', data)
    },
    // 请求推荐电台
    async getPersonalizedDJProgram() {
      const data = await this.$api.getPersonalizedDJProgram()
      console.log('电台', data)
    }
  },
  created() {
    this.getBanner()
    this.getPersonalizedNewSong()
    // this.getPersonalized()
    // this.getPersonalizedDJProgram()
  }
}
</script>

<style scoped></style>
