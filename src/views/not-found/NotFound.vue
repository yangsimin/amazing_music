<!--
 * @Author: simonyang
 * @Date: 2022-03-28 12:07:55
 * @LastEditTime: 2022-04-07 11:25:09
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="not-found text-center">
    <h1 class="text-9xl font-bold">404</h1>
    <p class="text-xl">页面无法找到</p>
    <p class="mt-10">正在跳转首页...</p>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      setTimeout(() => {
        vm.$router.replace({
          path: '/'
        })
      }, 2000)
    })
  }
}
</script>

<style scoped></style>
