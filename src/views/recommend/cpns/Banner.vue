<!--
 * @Author: simonyang
 * @Date: 2022-03-16 10:53:19
 * @LastEditTime: 2022-03-16 22:05:14
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="banner flex justify-center items-center overflow-hidden">
    <ul
      class="hidden w-1/4 max-h-[350px] mr-2 cursor-pointer lg:flex lg:flex-col"
    >
      <li
        v-for="(img, index) in images"
        :key="img.slice(-10)"
        @click="activeIndex = index"
        class="border border-transparent overflow-hidden"
        :class="{ 'amz-border-hl': index === activeIndex }"
      >
        <img :src="img" alt="" />
      </li>
    </ul>
    <amz-swiper
      ref="amzSwiper"
      class="w-full max-w-4xl max-h-[350px] cursor-[grab] lg:w-3/4"
      v-model="activeIndex"
      :indicator="indicator"
      :btnControl="btnControl"
    >
      <amz-swiper-item
        v-for="img in images"
        :key="img.slice(-10)"
        class="w-full"
      >
        <img
          :src="img"
          alt=""
          class="w-full max-w-screen-lg mx-auto"
          @load.once="imgLoaded"
        />
      </amz-swiper-item>
    </amz-swiper>
  </div>
</template>

<script>
import { AmzSwiper, AmzSwiperItem } from '@/base-ui/amz-swiper'

export default {
  name: 'banner',
  components: {
    AmzSwiper,
    AmzSwiperItem
  },
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    activeIndex: 0,
    indicator: true,
    btnControl: false,
    isImgLoaded: false
  }),
  methods: {
    imgLoaded() {
      if (!this.isImgLoaded) {
        this.$refs.amzSwiper.refreshLayout()
        this.isImgLoaded = true
      }
    }
  }
}
</script>

<style scoped>
.banner > ul {
  -webkit-tap-highlight-color: transparent;
}
</style>
