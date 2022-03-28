/*
 * @Author: simonyang
 * @Date: 2022-03-28 22:20:08
 * @LastEditTime: 2022-03-28 23:00:26
 * @LastEditors: simonyang
 * @Description:
 */

// 当前正在播放的歌曲对象
export const playingSong = state => {
  return state.playlist[state.playingIndex] || null
}

// 当前播放歌曲的索引值
export const playingIndex = state => state.playingIndex

// 当前是否在播放
export const isPlaying = state => state.isPlaying

// 播放音量
export const volume = state => state.volume

// 播放模式
export const playMode = state => state.playMode
