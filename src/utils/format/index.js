/*
 * @Author: simonyang
 * @Date: 2022-03-17 14:37:07
 * @LastEditTime: 2022-03-17 15:16:16
 * @LastEditors: simonyang
 * @Description:
 */
/**
 * @method: 将 duration(毫秒) 格式化成 xx:xx
 * @param {*} duration
 */
export function getSongTime(duration) {
  duration = Number(duration, 10)
  const totalSecond = Math.floor(duration / 1000)
  const minute = Math.floor(totalSecond / 60)
  const second = totalSecond % 60
  return ('0' + minute).slice(-2) + ':' + ('0' + second).slice(-2)
}
