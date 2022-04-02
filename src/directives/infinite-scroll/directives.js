/*
 * @Author: simonyang
 * @Date: 2022-04-02 11:07:26
 * @LastEditTime: 2022-04-02 17:44:20
 * @LastEditors: simonyang
 * @Description:
 */
import Logger from '@/utils/logger'
import { throttle } from '@/utils/performance'

const Log = Logger.create('infinite-scroll', true)

// 判断是否触底
function isBottom(el, container, offset = 0) {
  const elRect = el.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()

  return elRect.bottom <= containerRect.bottom + offset
}

export default {
  bind(el, binding) {
    Log.d('bind')
    if (!binding.value) {
      return
    }

    el._amz_loaded = false
    // 监听是否滚动到底部
    el._amz_scroll = throttle(function () {
      // 如果 el 不在  body 中, 也就是 deactivated 状态, 则禁用加载功能
      const disabled = !document.body.contains(el)
      Log.d('scroll', disabled)
      if (!disabled && !el._amz_loaded && isBottom(el, document.body)) {
        Log.d('load')
        binding.value()
        el._amz_loaded = true
      }
    }, 200)

    document.body.addEventListener('scroll', el._amz_scroll, { passive: true })
  },
  update() {
    Log.d('update')
  },
  componentUpdated(el) {
    Log.d('componentUpdated')
    el._amz_loaded = false
  },
  unbind(el) {
    Log.d('unbind')
    document.body.removeEventListener('scroll', el._amz_scroll)
  }
}
