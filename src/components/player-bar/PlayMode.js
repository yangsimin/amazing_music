/*
 * @Author: simonyang
 * @Date: 2022-03-22 17:14:31
 * @LastEditTime: 2022-03-22 17:48:39
 * @LastEditors: simonyang
 * @Description:
 */
// 歌曲播放模式, 列表循环 / 单曲循环 / 随机播放
export const PLAY_MODES = {
  LIST_LOOP: 0,
  SINGLE_LOOP: 1,
  RANDOM: 2
}

export const PLAY_MODES_ICON = [
  'icon-mode-list',
  'icon-mode-single',
  'icon-mode-random'
]
// mode: 0列表循环, 1单曲循环, 2随机播放
// next: true下一首, false上一首
function getSong(mode, curIndex, playList, next) {
  let index = -1
  const length = playList.length
  switch (mode) {
    case 0: // 列表循环
    case 1: // 单曲循环
      if (!next && curIndex === 0) {
        index = length - 1
      } else if (next && curIndex === length - 1) {
        index = 0
      } else {
        const step = next ? 1 : -1
        index = curIndex + step
      }
      break
    case 2: // 随机播放
      // 随机选择, 无法追溯顺序, 待优化
      index = Math.random() * (length - 1)
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
