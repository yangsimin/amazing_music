/*
 * @Author: simonyang
 * @Date: 2022-03-17 14:37:07
 * @LastEditTime: 2022-03-21 23:18:30
 * @LastEditors: simonyang
 * @Description:
 */
/**
 * @method: 将 duration 格式化成 xx:xx, 默认为毫秒, ms:false 为秒
 * @param {*} duration
 */
export function formatSongTime(duration, ms = true) {
  duration = Math.floor(Number(duration, 10))

  let totalSecond = ms ? Math.floor(duration / 1000) : duration
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
