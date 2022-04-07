<!--
 * @Author: simonyang
 * @Date: 2022-03-31 10:59:07
 * @LastEditTime: 2022-04-06 13:46:50
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <card-view class="nav-card">
    <template v-slot:title>
      <h3 class="pl-4 border-l-4 border-red-600 font-bold text-xl">
        {{ title }}
      </h3>
    </template>
    <ul class="mt-5" @click="itemClick">
      <li
        class="flex items-center mt-3 rounded-md text-black text-sm cursor-pointer media:hover:amz-text-hl"
        :class="[activeId === songList.id ? activeClass : '']"
        v-for="songList in topList"
        :key="songList.id"
        :data-id="songList.id"
      >
        <amz-image
          class="w-16 h-16 rounded-md overflow-hidden flex-shrink-0"
          :src="$format.formatImageUrl(songList.picUrl, 128, 128)"
        />
        <h4 class="ml-3 text-base font-bold amz-truncate-2">
          {{ songList.name }}
        </h4>
      </li>
    </ul>
  </card-view>
</template>

<script>
import CardView from '@/components/card-view'
export default {
  name: 'NavCard',
  components: {
    CardView
  },
  props: {
    title: String,
    activeId: Number,
    topList: Array
  },
  data: () => ({
    activeClass: '!bg-red-100 !bg-opacity-50 !text-red-600'
  }),
  methods: {
    itemClick(event) {
      const $li = event.target.closest('li')
      if (!($li && $li.dataset.id)) {
        return
      }
      this.$emit('id-change', Number($li.dataset.id))
    }
  }
}
</script>

<style scoped></style>
