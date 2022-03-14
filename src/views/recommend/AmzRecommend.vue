<!--
 * @Author: simonyang
 * @Date: 2022-03-14 12:19:27
 * @LastEditTime: 2022-03-14 22:35:45
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="amz-recommend">
    <amz-swiper :images="images" />
  </div>
</template>

<script>
import AmzSwiper from '@/base-ui/amz-swiper'

export default {
  name: 'AmzRecommend',
  components: {
    AmzSwiper
  },
  data: () => ({
    images: []
  }),
  methods: {
    async getBanner() {
      const data = await this.$api.getBanner()
      console.log(data)
      const images = data.banners.map(banner => banner.imageUrl)
      this.images.push(...images)
      console.log(this.images.splice(6))
    }
  },
  created() {
    this.getBanner()
  }
}
</script>

<style scoped></style>
