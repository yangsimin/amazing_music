<!--
 * @Author: simonyang
 * @Date: 2022-03-16 10:53:19
 * @LastEditTime: 2022-03-16 15:04:17
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
      class="flex justify-center items-center w-full max-w-4xl max-h-[350px] cursor-[grab] lg:w-3/4"
      :images="images"
      v-model="activeIndex"
      :indicator="indicator"
      :btnControl="btnControl"
    />
  </div>
</template>

<script>
import AmzSwiper from '@/base-ui/amz-swiper'

export default {
  name: 'banner',
  components: {
    AmzSwiper
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
    btnControl: false
  })
}
</script>

<style scoped></style>
