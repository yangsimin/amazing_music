/*
 * @Author: simonyang
 * @Date: 2022-03-17 14:37:07
 * @LastEditTime: 2022-03-18 22:40:31
 * @LastEditors: simonyang
 * @Description:
 */
/**
 * @method: 将 duration(毫秒) 格式化成 xx:xx
 * @param {*} duration
 */
export function formatSongTime(duration) {
  duration = Number(duration, 10)
  const totalSecond = Math.floor(duration / 1000)
  const minute = Math.floor(totalSecond / 60)
  const second = totalSecond % 60
  return ('0' + minute).slice(-2) + ':' + ('0' + second).slice(-2)
}

/**
 * @method: 获取特定尺寸的图片url
 * @param {*} imageUrl 图片 url
 * @param {*} width 指定图片宽
 * @param {*} height 指定图片高
 * @return 带有宽高参数的 url
 */
export function formatImageUrl(imageUrl, width, height) {
  return `${imageUrl}?param=${width}y${height}`
}

/**
 * @method: 格式化播放次数,以亿/万为单位
 * @param {*} count
 * @return count 数字
 * @return unit 单位
 */
export function formatPlayCount(count) {
  count = Number(count, 10)
  // 格式化为 亿 / 万
  const units = [
    { count: 100000000, name: '亿' },
    { count: 10000, name: '万' }
  ]

  for (let unit of units) {
    if (count >= unit.count) {
      const newCount = {
        count: Math.floor(count / unit.count),
        unit: unit.name
      }
      return newCount
    }
  }

  return { count, unit: '' }
}
