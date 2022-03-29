/*
 * @Author: simonyang
 * @Date: 2022-03-29 16:12:41
 * @LastEditTime: 2022-03-29 20:55:47
 * @LastEditors: simonyang
 * @Description:
 */
import Vue from 'vue'
import AmzLoading from '@/base-ui/amz-loading'
/**
 * Vue.extend 接受参数并返回一个构造器，new 该构造器可以返回一个组件实例
 * 当我们 new Mask() 的时候，把该组件实例挂载到一个 div 上
 **/

const Loading = Vue.extend(AmzLoading)
export default {
  // 第一次绑定到元素时调用
  bind: function (el, binding) {
    const loading = new Loading()
    loading.$mount(document.createElement('div'))

    // 使用 el 临时存储 loading 实例
    el.__loading = loading
    binding.value && toggleLoading(el, binding)
  },
  // VNode 触发更新时调用, 切换 loading 状态
  update: function (el, binding) {
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding)
    }
  },
  // 解绑时调用, 销毁 loading 实例
  unbind: function (el) {
    el.__loading && el.__loading.$destroy()
  }
}

// 显示/隐藏 loading
const toggleLoading = (el, binding) => {
  if (binding.value) {
    Vue.nextTick(() => {
      // 控制loading组件显示
      el.style.position = 'relative'
      // 插入到目标元素
      el.append(el.__loading.$el)
    })
  } else {
    el.style.position = ''
    el.__loading.$el.remove()
  }
}
