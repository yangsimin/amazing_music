<!--
 * @Author: simonyang
 * @Date: 2022-03-29 10:23:03
 * @LastEditTime: 2022-03-29 11:10:52
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="card-view p-3 rounded-md shadow-md">
    <slot name="title">
      <h3 class="pl-4 border-l-4 border-red-600 font-bold text-xl">
        {{ title }}
      </h3>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CardView',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped></style>
