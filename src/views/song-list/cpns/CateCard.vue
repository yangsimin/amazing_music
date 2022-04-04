<!--
 * @Author: simonyang
 * @Date: 2022-03-30 09:22:05
 * @LastEditTime: 2022-04-04 15:59:04
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="cate-card">
    <div
      class="-mr-1"
      :style="{ width: Math.ceil(tags.length / row) * (6 + 0.25) + 'rem' }"
    >
      <h3 class="font-bold text-lg text-center">{{ category }}</h3>
      <div
        class="flex flex-col flex-wrap items-start content-start justify-start mt-2"
        :style="{ height: (1.25 + 0.25 + 0.5 + 0.125) * row + 'rem' }"
      >
        <span
          class="w-24 mr-1 mt-1 py-1 text-center text-sm text-black bg-gray-100 bg-opacity-40 border rounded-full cursor-pointer media:hover:amz-text-hl"
          :class="[
            tag.name === activeTag ? activeClass : '',
            { hotTag: tag.hot }
          ]"
          v-for="tag in tags"
          :key="tag.name"
          @click="$emit('changeTag', tag.name)"
        >
          {{ tag.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CateCard',
  props: {
    category: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      default: () => []
    },
    activeTag: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    row: 7,
    activeClass: '!bg-red-600 !text-white !border-red-600'
  })
}
</script>

<style scoped>
.hotTag {
  position: relative;
}
.hotTag::after {
  content: 'hot';
  position: absolute;
  left: 90%;
  top: 10%;
  padding: 0.125rem 0.4rem;
  border-radius: 999px;
  background-color: var(--color-text-hl);
  text-transform: uppercase;
  font-size: 1rem;
  color: #fff;
  transform: translate(-50%, -50%) scale(0.5);
  opacity: 0.9;
}
</style>
