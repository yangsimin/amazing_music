/*
 * @Author: simonyang
 * @Date: 2022-03-22 17:14:31
 * @LastEditTime: 2022-04-05 14:18:32
 * @LastEditors: simonyang
 * @Description:
 */
import { playModes } from '@/common/play-mode'

// mode: 0列表循环, 1单曲循环, 2随机播放
// next: true下一首, false上一首
function getSong(mode, curIndex, playList, next) {
  let index = -1
  const length = playList.length
  switch (mode) {
    case playModes.LIST_LOOP: // 列表循环
    case playModes.SINGLE_LOOP: // 单曲循环
      if (!next && curIndex === 0) {
        index = length - 1
      } else if (next && curIndex === length - 1) {
        index = 0
      } else {
        const step = next ? 1 : -1
        index = curIndex + step
      }
      break
    case playModes.RANDOM: // 随机播放
      // 随机选择, 无法追溯顺序, 待优化
      index = Math.floor(Math.random() * (length - 1))
      break
  }
  return index
}
export function getNextSong(mode) {
  return function (curIndex, playList) {
    return getSong(mode, curIndex, playList, true)
  }
}

export function getPrevSong(mode) {
  return function (curIndex, playList) {
    return getSong(mode, curIndex, playList, false)
  }
}
