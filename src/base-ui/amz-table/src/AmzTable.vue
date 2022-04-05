<!--
 * @Author: simonyang
 * @Date: 2022-04-04 21:55:13
 * @LastEditTime: 2022-04-05 10:43:38
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="amz-table">
    <div
      class="flex"
      :class="rowClassName"
      v-for="(rowData, rowIndex) in data"
      :key="rowData.id"
    >
      <div :class="colClassNames[prop]" v-for="prop in props" :key="prop">
        <slot
          :name="prop"
          :cell="rowData[prop]"
          :row="rowData"
          :index="rowIndex"
        >
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AmzTable',
  props: {
    props: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    colClassNames: {
      type: Object,
      default: () => {}
    },
    rowClassName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped></style>
