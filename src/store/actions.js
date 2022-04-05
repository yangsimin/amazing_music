/*
 * @Author: simonyang
 * @Date: 2022-03-23 14:54:07
 * @LastEditTime: 2022-03-31 12:26:33
 * @LastEditors: simonyang
 * @Description:
 */
import localCache from '@/utils/cache'

import * as types from '../types/mutation-types'

import {
  // KEY_PLAYING_INDEX,
  KEY_SONG_LIST,
  KEY_VOLUME,
  KEY_PLAY_MODE
} from '@/types/cache-types'

// 加载音量
// 加载歌单
// 加载正在播放歌曲的索引值
export const loadPlayer = function ({ commit }) {
  // 音量
  const volume = localCache.getCache(KEY_VOLUME)
  if (volume !== undefined) {
    commit(types._SET_VOLUME, volume)
  }

  // 歌单
  const songList = localCache.getCache(KEY_SONG_LIST)
  if (songList instanceof Array && songList.length > 0) {
    commit(types._INSERT_SONGS, { songs: songList, index: 0 })
  }

  // 当前歌曲索引
  // const playingIndex = localCache.getCache(KEY_PLAYING_INDEX)
  // if (playingIndex !== undefined) {
  //   commit(CHANGE_PLAYING_INDEX, playingIndex)
  // }

  const playMode = localCache.getCache(KEY_PLAY_MODE)
  if (playMode !== undefined) {
    commit(types.CHANGE_PLAY_MODE, playMode)
  }
}
// 插入歌曲到歌单
export const insertSongs = function ({ commit, state, dispatch }, songs) {
  if (!(songs instanceof Array) || songs.length === 0) {
    return
  }

  // 1. 添加一首
  if (songs.length === 1) {
    // 判断歌单中是否有这首歌
    const index = state.playlist.findIndex(song => song.id === songs[0].id)
    if (index !== -1) {
      commit(types.CHANGE_PLAYING_INDEX, index)
      return
    }
    commit(types._INSERT_SONGS, { songs, index: state.playingIndex + 1 })
    commit(types.CHANGE_PLAYING_INDEX, state.playingIndex + 1)
    return
  }
  // 2. 添加多首, 粗暴的方法, 将原有歌曲清空, 再添加
  dispatch('clearSongList')
  commit(types._INSERT_SONGS, { songs, index: 0 })
  commit(types.CHANGE_PLAYING_INDEX, 0)

  localCache.setCache(KEY_SONG_LIST, state.playlist)
}
// 清空歌单
export const clearSongList = function ({ commit }) {
  commit(types._CLEAR_SONG_LIST)
  commit(types.CHANGE_PLAYING_INDEX, -1)
  localCache.clearCache(KEY_SONG_LIST)
}
// 切换歌曲
export const changeSong = function ({ commit, state }, getSong) {
  // mode: 0列表循环, 1单曲循环, 2随机播放
  // next: true下一首, false上一首
  const playingIndex = getSong(state.playingIndex, state.playlist)
  commit(types.CHANGE_PLAYING_INDEX, playingIndex)
}
// 设置音量
export const setVolume = function ({ commit }, volume) {
  if (volume > 1 || volume < 0) {
    return
  }
  localCache.setCache(KEY_VOLUME, volume)
  commit(types._SET_VOLUME, volume)
}
// 删除歌曲
export const deleteSong = function ({ commit, state }, index) {
  if (index < state.playingIndex) {
    // 当删除的是当前播放之前的, 需要将播放索引往前移动
    commit(types.CHANGE_PLAYING_INDEX, state.playingIndex - 1)
  } else if (index === state.playingIndex) {
    // 删除的是当前播放的歌曲, 有两种特殊情况
    if (state.playingIndex.length === 1) {
      commit(types.CHANGE_PLAYING_INDEX, -1)
    } else if (index === state.playlist.length - 1) {
      commit(types.CHANGE_PLAYING_INDEX, index - 1)
    }
  }
  commit(types._DELETE_SONG, index)
  localCache.setCache(KEY_SONG_LIST, state.playlist)
}
