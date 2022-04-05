/*
 * @Author: simonyang
 * @Date: 2022-03-23 16:24:22
 * @LastEditTime: 2022-04-05 22:34:13
 * @LastEditors: simonyang
 * @Description:
 */
import * as types from '@/types/mutation-types'
import * as keys from '@/types/cache-types'

import localCache from '../utils/cache'

export default {
  [types.CHANGE_PLAYING_INDEX](state, index) {
    state.playingIndex = index
    localCache.setCache(keys.KEY_PLAYING_INDEX, index)
  },
  [types.CHANGE_PLAY_MODE](state, mode) {
    state.playMode = mode
    localCache.setCache(keys.KEY_PLAY_MODE, mode)
  },
  [types.CHANGE_PLAYING_STATE](state, isPlaying) {
    state.isPlaying = isPlaying
  },
  // 插入歌曲时, 记得将 playingIndex 置0
  [types._INSERT_SONGS](state, { songs, index }) {
    state.playlist.splice(index, 0, ...songs)
  },
  [types._CLEAR_SONG_LIST](state) {
    // TODO wait for testing
    state.playlist.splice(0)
  },
  [types._SET_VOLUME](state, volume) {
    state.volume = volume
  },
  [types._DELETE_SONG](state, index) {
    state.playlist.splice(index, 1)
  }
}
