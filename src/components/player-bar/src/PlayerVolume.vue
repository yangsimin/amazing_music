<!--
 * @Author: simonyang
 * @Date: 2022-03-22 21:44:14
 * @LastEditTime: 2022-03-25 12:46:15
 * @LastEditors: simonyang
 * @Description: emits: muted
-->
<template>
  <div class="player-bar-volume group relative">
    <div
      class="hidden wrapper absolute left-0 bottom-full h-32 px-2 py-4 bg-white shadow-lg rounded z-50 group-hover:block"
    >
      <amz-seek-bar
        class="h-full"
        :horizontal="false"
        :seekBarStyle="seekBarStyle"
        :progress="1 - volume"
        :canSeek="canSeek"
        @pointerMove="updateVolume"
        @pointerUp="updateVolume"
      ></amz-seek-bar>
    </div>

    <i
      class="iconfont before:text-2xl"
      :class="volumeIcon"
      @click="toggleMuted"
    ></i>
  </div>
</template>

<script>
import AmzSeekBar from '@/base-ui/amz-seek-bar'

const HIGH_LEVEL = 0.7
const MIDDLE_LEVEL = 0.3

// emits: ['muted']
export default {
  name: 'PlayerVolume',
  components: {
    AmzSeekBar
  },
  model: {
    prop: 'volume',
    event: 'updateVolume'
  },
  props: {
    volume: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    seekBarStyle: {
      background: { background: 'rgba(239, 68, 68)', width: '7px' },
      front: { display: 'none' },
      track: { background: 'rgba(229, 231, 235)', width: '7px' },
      dot: { background: 'rgba(239, 68, 68)', width: '15px', height: '15px' }
    },
    canSeek: true
  }),
  computed: {
    volumeIcon() {
      if (this.volume >= HIGH_LEVEL) {
        return 'icon-volume-high'
      }
      if (this.volume >= MIDDLE_LEVEL) {
        return 'icon-volume-middle'
      }
      if (this.volume > 0) {
        return 'icon-volume-low'
      }
      return 'icon-volume-cross'
    }
  },
  methods: {
    updateVolume(val) {
      this.$emit('updateVolume', 1 - val)
    },
    toggleMuted() {
      this.$emit('muted', this.volume !== 0)
    }
  }
}
</script>

<style scoped>
.wrapper {
  transform: translateX(calc(-50% + 0.7rem)) translateY(-5px);
}
/* 倒三角 */
.wrapper::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  border: 7px solid transparent;
  border-top-color: white;
  transform: translateX(-50%) translateY(100%);
}
</style>
