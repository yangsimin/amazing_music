/*
 * @Author: simonyang
 * @Date: 2022-04-02 09:56:54
 * @LastEditTime: 2022-04-02 10:46:30
 * @LastEditors: simonyang
 * @Description:
 */
/**
 * @method: 节流函数
 * @param {*} leading 首次调用是否立即执行
 * @param {*} tailing 最后一次调用是否执行
 */
export function throttle(
  func,
  interval,
  options = { leading: true, tailing: true }
) {
  const { leading, tailing } = options
  let firstInvoke = false
  let lastTime = 0
  let timer = null
  return function (...args) {
    const nowTime = Date.now()

    // leading 为 false 时跳过第一次调用
    if (!firstInvoke && !leading) {
      lastTime = nowTime
      firstInvoke = true
      return
    }

    // 剩余间隔事件
    const remainTime = interval - (nowTime - lastTime)
    // 可以立即调用
    if (remainTime <= 0) {
      clearTimeout(timer)
      lastTime = nowTime
      func.apply(this, args)
      return
    }

    // 延迟调用, tailing 时使用
    if (tailing) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        lastTime = Date.now()
        func.apply(this, args)
        firstInvoke = false
      }, remainTime)
    }
  }
}
/**
 * @method: 防抖函数
 * @param {*} func
 * @param {*} interval, 间隔时间 ms
 * @param {*} immediate, 首次是否立即执行
 */
export function debounce(func, interval, immediate = true) {
  let timer = null
  let firstInvokeTimer = null
  let isFirstInvoke = true

  const _debounce = function (...args) {
    if (isFirstInvoke && immediate) {
      isFirstInvoke = false

      firstInvokeTimer = setTimeout(() => {
        isFirstInvoke = true
        firstInvokeTimer = null
      }, interval)
      return func.apply(this, args)
    }

    firstInvokeTimer && clearTimeout(firstInvokeTimer)
    timer && clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
      isFirstInvoke = true
      timer = null
      firstInvokeTimer = null
    }, interval)
  }

  _debounce.cancel = function () {
    timer && clearTimeout(timer)
    firstInvokeTimer && clearTimeout(firstInvokeTimer)
    timer = null
    firstInvokeTimer = null
    isFirstInvoke = true
  }
  return _debounce
}
