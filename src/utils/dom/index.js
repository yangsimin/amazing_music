/*
 * @Author: simonyang
 * @Date: 2022-04-06 20:21:23
 * @LastEditTime: 2022-04-06 22:09:37
 * @LastEditors: simonyang
 * @Description:
 */

/**
 * @method: 平滑滚动
 * @param {*} container 滚动容器
 * @param {*} distance 滚动距离
 * @param {*} speed 滚动所需总时间
 */
export function smoothScrollTo(
  container,
  top,
  speed = 1000,
  easing = 'easeInOutQuad'
) {
  // 滚动起始时间点
  let start = 0
  // 起始位置
  const startLocation = container.scrollTop
  // 终止位置
  const endLocation = top
  const distance = endLocation - startLocation
  // console.log(startLocation, endLocation, distance)
  function loopAnimationScroll(timestamp) {
    if (!start) {
      start = timestamp
    }
    const elapsed = timestamp - start
    let percentage = speed === 0 ? 0 : elapsed / speed
    percentage = percentage > 1 ? 1 : percentage
    const position =
      startLocation + distance * _easingPattern(easing, percentage)
    // console.log('scroll to', position, endLocation)
    container.scrollTo(0, Math.floor(position))
    if (Math.floor(position) !== Math.floor(endLocation)) {
      window.requestAnimationFrame(loopAnimationScroll)
    }
  }
  window.requestAnimationFrame(loopAnimationScroll)
}

// https://github.com/cferdinandi/smooth-scroll/blob/master/src/core.js
function _easingPattern(easing, time) {
  let pattern
  // Default Easing Patterns
  if (easing === 'easeInQuad') pattern = time * time // accelerating from zero velocity
  if (easing === 'easeOutQuad') pattern = time * (2 - time) // decelerating to zero velocity
  if (easing === 'easeInOutQuad')
    pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time // acceleration until halfway, then deceleration
  if (easing === 'easeInCubic') pattern = time * time * time // accelerating from zero velocity
  if (easing === 'easeOutCubic') pattern = --time * time * time + 1 // decelerating to zero velocity
  if (easing === 'easeInOutCubic')
    pattern =
      time < 0.5
        ? 4 * time * time * time
        : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1 // acceleration until halfway, then deceleration
  if (easing === 'easeInQuart') pattern = time * time * time * time // accelerating from zero velocity
  if (easing === 'easeOutQuart') pattern = 1 - --time * time * time * time // decelerating to zero velocity
  if (easing === 'easeInOutQuart')
    pattern =
      time < 0.5
        ? 8 * time * time * time * time
        : 1 - 8 * --time * time * time * time // acceleration until halfway, then deceleration
  if (easing === 'easeInQuint') pattern = time * time * time * time * time // accelerating from zero velocity
  if (easing === 'easeOutQuint')
    pattern = 1 + --time * time * time * time * time // decelerating to zero velocity
  if (easing === 'easeInOutQuint')
    pattern =
      time < 0.5
        ? 16 * time * time * time * time * time
        : 1 + 16 * --time * time * time * time * time // acceleration until halfway, then deceleration
  return pattern || time // no easing, no acceleration
}
