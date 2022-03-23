/*
 * @Author: simonyang
 * @Date: 2022-03-22 13:01:27
 * @LastEditTime: 2022-03-22 21:34:24
 * @LastEditors: simonyang
 * @Description:
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

    // leading 时跳过第一次调用
    if (!firstInvoke && leading) {
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

export default throttle
