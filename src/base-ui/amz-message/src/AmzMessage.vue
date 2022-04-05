<!--
 * @Author: simonyang
 * @Date: 2022-04-05 20:58:10
 * @LastEditTime: 2022-04-05 22:13:02
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <transition>
    <div
      class="amz-message flex items-center absolute top-14 right-5 z-30 py-3 pr-3 border-t-8 rounded-md shadow-md bg-white"
      :class="boxClass"
      v-if="isShow"
    >
      <i class="px-4 before:text-2xl" :class="iconClass" />
      <span class="w-60">
        {{ message }}
      </span>
    </div>
  </transition>
</template>

<script>
const SUCCESS = 0
const INFO = 1
const WARNING = 2
const ERROR = 3

export default {
  name: 'AmzMessage',
  data: () => ({
    message: '',
    isShow: false,
    type: INFO,
    style: {
      [SUCCESS]: {
        icon: 'iconfont icon-signal-ok before:text-green-600',
        box: 'border-green-600'
      },
      [INFO]: {
        icon: 'iconfont icon-signal-info before:text-blue-600',
        box: 'border-blue-600'
      },
      [WARNING]: {
        icon: 'iconfont icon-signal-warning before:text-yellow-600',
        box: 'border-yellow-600'
      },
      [ERROR]: {
        icon: 'iconfont icon-signal-info before:text-red-600',
        box: 'border-red-600'
      }
    }
  }),
  computed: {
    iconClass() {
      return this.style[this.type].icon
    },
    boxClass() {
      return this.style[this.type].box
    }
  },
  methods: {
    _show(type, message, duration = 3000) {
      this.type = type
      this.message = message
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, duration)
    },
    success(message, duration) {
      this._show(SUCCESS, message, duration)
    },
    info(message, duration) {
      this._show(INFO, message, duration)
    },
    warning(message, duration) {
      this._show(WARNING, message, duration)
    },
    error(message, duration) {
      this._show(ERROR, message, duration)
    }
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  @apply transition-all duration-500;
}

.v-enter,
.v-leave-to {
  @apply opacity-0 translate-x-full;
}
</style>
