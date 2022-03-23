/*
 * @Author: simonyang
 * @Date: 2022-03-23 16:24:22
 * @LastEditTime: 2022-03-23 22:27:00
 * @LastEditors: simonyang
 * @Description:
 */
import {
  CHANGE_PLAYING_INDEX,
  _INSERT_SONGS,
  _CLEAR_SONG_LIST,
  _SET_PLAYING_URL,
  _SET_VOLUME
} from '../types/mutation-types'

export default {
  [CHANGE_PLAYING_INDEX](state, index) {
    console.log('change playing index', index)
    state.playingIndex = index
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
  }
}
