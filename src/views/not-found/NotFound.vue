<!--
 * @Author: simonyang
 * @Date: 2022-03-28 12:07:55
 * @LastEditTime: 2022-03-28 12:23:24
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div>
    <h1 class="not-found text-center text-3xl font-bold">
      Sorry! Page Not Found!<br />
      path: {{ $route.path }} <br />
      params: {{ $route.params }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped></style>
