<!--
 * @Author: simonyang
 * @Date: 2022-03-13 21:13:40
 * @LastEditTime: 2022-04-11 15:39:12
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="home-page min-w-[285px]">
    <div class="bg-white shadow-md">
      <amz-header class="amz-max-width mx-auto px-2" />
    </div>

    <main class="w-full h-full mt-2 amz-max-width mx-auto pb-32 px-2 md:pb-24">
      <keep-alive exclude="SongListDetail">
        <transition>
          <router-view></router-view>
        </transition>
      </keep-alive>
    </main>
    <amz-player class="z-20"></amz-player>
    <amz-back-top class="z-10"></amz-back-top>
  </div>
</template>

<script>
import AmzHeader from './cpns/AmzHeader.vue'
import AmzPlayer from './cpns/AmzPlayer.vue'
import mixinLifeCycle from '@/mixins/life-cycle'

export default {
  name: 'HomePage',
  mixins: [mixinLifeCycle(false)],
  components: {
    AmzHeader,
    AmzPlayer
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 300ms;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
