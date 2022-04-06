<!--
 * @Author: simonyang
 * @Date: 2022-04-05 22:58:17
 * @LastEditTime: 2022-04-06 14:34:26
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <transition>
    <div
      v-if="isShow"
      class="amz-back-top absolute bottom-24 right-10 flex items-center justify-center w-14 h-14 rounded-full shadow-md bg-red-600 -rotate-90 cursor-pointer"
      @click="backTop"
    >
      <i
        class="iconfont icon-next-page before:text-white before:text-2xl before:font-bold"
      />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AmzBackTop',
  props: {
    showDistance: {
      type: Number,
      default: 400
    }
  },
  data: () => ({
    isShow: false
  }),
  methods: {
    backTop() {
      let scrollTop = document.body.scrollTop
      if (scrollTop > 0) {
        document.body.scrollTo(0, scrollTop - scrollTop / 5)
        window.requestAnimationFrame(this.backTop)
      }
    },
    scroll() {
      if (document.body.scrollTop >= this.showDistance) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  mounted() {
    document.body.addEventListener('scroll', this.scroll)
  },
  destroyed() {
    document.body.removeEventListener('scroll', this.scroll)
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  @apply transition-transform duration-300;
}

.v-enter,
.v-leave-to {
  @apply -rotate-180 scale-0;
}
</style>
