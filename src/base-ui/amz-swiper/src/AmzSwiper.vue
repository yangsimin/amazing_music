<!--
 * @Author: simonyang
 * @Date: 2022-03-14 17:58:40
 * @LastEditTime: 2022-03-14 23:03:57
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="amz-swiper overflow-hidden" ref="amzSwiper">
    <div ref="wrapper" class="flex transition-all">
      <div
        v-for="img in images"
        :key="img.slice(-10)"
        class="w-full flex-shrink-0"
      >
        <img :src="img" alt="" class="max-w-screen-lg mx-auto" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AmzSwiper',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    activeIndex: 0 // 当前显示的元素索引
  }),
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
    // this.$refs.amzSwiper
    // 启用监听器
    this.$watch(
      function () {
        return this.$refs.amzSwiper.offsetWidth
      },
      function (val) {
        console.log(val)
      },
      {
        immediate: true,
        deep: true
      }
    )
    setInterval(() => {
      // console.log(this.bannerWidth)
      console.log(this.$refs.amzSwiper.offsetWidth)
      // this.$refs.wrapper.style.transform = `translateX(-${this.bannerWidth}px)`
    }, 2000)
  },
  updated() {
    console.log('updated')
  }
}
</script>

<style scoped></style>
