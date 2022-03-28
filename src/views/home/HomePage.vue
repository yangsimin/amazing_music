<!--
 * @Author: simonyang
 * @Date: 2022-03-13 21:13:40
 * @LastEditTime: 2022-03-28 12:20:01
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="home-page min-w-[285px]">
    <div class="bg-white shadow-md">
      <amz-header class="amz-max-width mx-auto" />
    </div>

    <main class="w-full h-full mt-2 amz-max-width mx-auto pb-32 px-2 md:pb-24">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </main>
    <amz-player></amz-player>
  </div>
</template>

<script>
import AmzHeader from './cpns/AmzHeader.vue'
import AmzPlayer from './cpns/AmzPlayer.vue'

export default {
  name: 'HomePage',
  components: {
    AmzHeader,
    AmzPlayer
  }
}
</script>

<style scoped></style>
