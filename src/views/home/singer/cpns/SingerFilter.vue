<!--
 * @Author: simonyang
 * @Date: 2022-04-01 15:43:35
 * @LastEditTime: 2022-04-06 09:09:37
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="singer-filter">
    <div @click="tagChange('initial', $event)">
      <a
        class="inline-block mb-2 mr-2 px-5 py-1 text-center text-sm text-black bg-gray-100 bg-opacity-40 border rounded-full cursor-pointer transition-colors media:hover:amz-text-hl"
        :class="[tag.code === activeInitial ? activeClass : '']"
        v-for="tag in initials"
        :key="tag.name"
        :data-code="tag.code"
        >{{ tag.name }}</a
      >
    </div>
    <div
      class="mt-1 border-t-2 pt-3 border-opacity-30"
      @click="tagChange('type', $event)"
    >
      <a
        class="inline-block mb-2 mr-2 px-5 py-1 text-center text-sm text-black bg-gray-100 bg-opacity-40 border rounded-full cursor-pointer transition-colors media:hover:amz-text-hl"
        :class="[tag.code === activeType ? activeClass : '']"
        v-for="tag in types"
        :key="tag.name"
        :data-code="tag.code"
        >{{ tag.name }}</a
      >
    </div>
    <div
      class="mt-1 border-t-2 pt-3 border-opacity-30"
      @click="tagChange('area', $event)"
    >
      <a
        class="inline-block mb-2 mr-2 px-5 py-1 text-center text-sm text-black bg-gray-100 bg-opacity-40 border rounded-full cursor-pointer transition-colors media:hover:amz-text-hl"
        :class="[tag.code === activeArea ? activeClass : '']"
        v-for="tag in areas"
        :key="tag.name"
        :data-code="tag.code"
        >{{ tag.name }}</a
      >
    </div>
  </div>
</template>

<script>
import { range } from '@/utils/number'

// 生成字母 A~Z
const AZ = range(65, 91).map(code => String.fromCharCode(code))

export default {
  name: 'SingerFilter',
  props: {
    activeInitial: {
      type: String,
      default: '-1'
    },
    activeType: {
      type: Number,
      default: -1
    },
    activeArea: {
      type: Number,
      default: -1
    }
  },
  data: () => ({
    initials: [
      { name: '热门', code: '-1' },
      ...AZ.map(char => ({ name: char, code: char })),
      { name: '其他', code: '0' }
    ],
    types: [
      { name: '全部', code: -1 },
      { name: '男歌手', code: 1 },
      { name: '女歌手', code: 2 },
      { name: '乐队', code: 3 }
    ],
    areas: [
      { name: '全部', code: -1 },
      { name: '华语', code: 7 },
      { name: '欧美', code: 96 },
      { name: '日本', code: 8 },
      { name: '韩国', code: 16 },
      { name: '其他', code: 0 }
    ],
    activeClass: '!bg-red-600 !border-red-600 !bg-opacity-100 !text-white '
  }),
  methods: {
    tagChange(type, event) {
      if (!event.target.dataset.code) {
        return
      }
      this.$emit('tagChange', type, event.target.dataset.code)
    }
  }
}
</script>

<style scoped></style>
