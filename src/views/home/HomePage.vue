<!--
 * @Author: simonyang
 * @Date: 2022-03-13 21:13:40
 * @LastEditTime: 2022-03-20 23:48:55
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="home-page min-w-[285px]">
    <div class="bg-white shadow-md">
      <amz-header class="amz-max-width mx-auto" />
    </div>

    <main class="mt-2 amz-max-width mx-auto">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </main>
    <amz-player></amz-player>
  </div>
</template>

<script>
import AmzHeader from './cpns/AmzHeader.vue'
import AmzPlayer from '@/components/amz-player'

export default {
  name: 'HomePage',
  components: {
    AmzHeader,
    AmzPlayer
  }
}
</script>

<style scoped></style>
