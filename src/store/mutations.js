/*
 * @Author: simonyang
 * @Date: 2022-03-23 16:24:22
 * @LastEditTime: 2022-03-25 14:38:38
 * @LastEditors: simonyang
 * @Description:
 */
import {
  CHANGE_PLAYING_INDEX,
  CHANGE_PLAY_MODE,
  _INSERT_SONGS,
  _CLEAR_SONG_LIST,
  _SET_PLAYING_URL,
  _SET_VOLUME,
  _DELETE_SONG
} from '../types/mutation-types'
import { KEY_PLAYING_INDEX, KEY_PLAY_MODE } from '../types/cache-types'

import localCache from '../utils/cache'

export default {
  [CHANGE_PLAYING_INDEX](state, index) {
    state.playingIndex = index
    localCache.setCache(KEY_PLAYING_INDEX, index)
  },
  [CHANGE_PLAY_MODE](state, mode) {
    state.playMode = mode
    localCache.setCache(KEY_PLAY_MODE, mode)
  },
  // 插入歌曲时, 记得将 playingIndex 置0
  [_INSERT_SONGS](state, { songs, index }) {
    state.playlist.splice(index, 0, ...songs)
  },
  [_CLEAR_SONG_LIST](state) {
    // TODO wait for testing
    state.playlist.splice(0)
  },
  [_SET_PLAYING_URL](state, url) {
    state.playlist[state.playingIndex].url = url
  },
  [_SET_VOLUME](state, volume) {
    state.volume = volume
  },
  [_DELETE_SONG](state, index) {
    state.playlist.splice(index, 1)
  }
}
