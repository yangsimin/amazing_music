/*
 * @Author: simonyang
 * @Date: 2022-03-17 14:37:07
 * @LastEditTime: 2022-03-24 17:33:35
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
/**
 * @method: 格式化时间戳(yyyy-MM-dd HH:mm:ss:SSS)
 * @param {*} format 格式
 * @param {*} timestamp 时间戳
 */
export function formatDate(format, timestamp) {
  const date = new Date(timestamp)
  const option = {
    // Java SimpleDateFormat 规则
    'y+': date.getFullYear().toString(), // 年
    'M+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时 24时制
    'm+': date.getMinutes().toString(), // 分
    's+': date.getSeconds().toString(), // 秒
    'S+': date.getMilliseconds().toString() // 毫秒
  }

  for (const rule in option) {
    const regExp = new RegExp(rule, 'g')
    if (regExp.test(format)) {
      const time = option[rule]
      format = format.replace(regExp, match => {
        const offset = time.length - match.length
        if (offset > 0) {
          return time.slice(offset)
        }
        return time.padStart(match.length, 0)
      })
    }
  }
  return format
}
