/*
 * @Author: simonyang
 * @Date: 2022-03-26 11:47:42
 * @LastEditTime: 2022-03-29 20:55:23
 * @LastEditors: simonyang
 * @Description: 点击元素外头时, 触发函数
 */
const clickOutside = {
  bind(el, binding) {
    function pointerdown(event) {
      if (!binding.value) {
        return
      }

      binding.value(el, event)
    }
    el.__vueClickOutside__ = pointerdown
  },
  update(el) {
    if (el.dataset.show) {
      // 显示
      document.addEventListener('pointerdown', el.__vueClickOutside__)
    } else {
      // 关闭
      document.removeEventListener('pointerdown', el.__vueClickOutside__)
    }
  },
  unbind(el) {
    delete el.__vueClickOutside__
  }
}

export default clickOutside
