/*
 * @Author: simonyang
 * @Date: 2022-03-23 14:54:07
 * @LastEditTime: 2022-03-23 22:26:24
 * @LastEditors: simonyang
 * @Description:
 */
import { getSongUrl } from '@/api'
import localCache from '@/utils/cache'
import {
  LOAD_VOLUME,
  LOAD_SONG_LIST,
  INSERT_SONGS,
  CLEAR_SONG_LIST,
  SET_PLAYING_URL,
  CHANGE_SONG,
  REQUEST_PLAYING_SONG_URL,
  SET_VOLUME
} from '../types/action-types'

import {
  CHANGE_PLAYING_INDEX,
  _INSERT_SONGS,
  _CLEAR_SONG_LIST,
  _SET_PLAYING_URL,
  _SET_VOLUME
} from '../types/mutation-types'

import { KEY_SONG_LIST, KEY_VOLUME } from '@/types/cache-types'

export default {
  // 加载音量
  [LOAD_VOLUME]({ commit }) {
    const volume = localCache.getCache(KEY_VOLUME)
    volume && commit(_SET_VOLUME, volume)
  },
  // 加载歌单
  [LOAD_SONG_LIST]({ commit }) {
    const songList = localCache.getCache(KEY_SONG_LIST)
    console.log('load song list', songList)
    if (!(songList instanceof Array) || songList.length === 0) {
      return
    }
    commit(_INSERT_SONGS, { songs: songList, index: 0 })
  },
  // 插入歌曲到歌单
  [INSERT_SONGS]({ commit, state }, songs) {
    if (!(songs instanceof Array) || songs.length === 0) {
      return
    }

    commit(_INSERT_SONGS, { songs, index: state.playingIndex + 1 })
    commit(CHANGE_PLAYING_INDEX, state.playingIndex + 1)

    localCache.setCache(KEY_SONG_LIST, state.playlist)
  },
  // 清空歌单
  [CLEAR_SONG_LIST]({ commit }) {
    commit(_CLEAR_SONG_LIST)
    commit(CHANGE_PLAYING_INDEX, -1)
    localCache.clearCache(KEY_SONG_LIST)
  },
  // 设置歌曲对应的 url
  [SET_PLAYING_URL]({ commit, state }, payload) {
    if (state.playingIndex < 0) {
      return
    }
    commit(_SET_PLAYING_URL, payload)
  },
  // 切换歌曲
  [CHANGE_SONG]({ commit, state }, getSong) {
    // mode: 0列表循环, 1单曲循环, 2随机播放
    // next: true下一首, false上一首
    const playingIndex = getSong(state.playingIndex, state.playlist)
    commit(CHANGE_PLAYING_INDEX, playingIndex)
  },
  // 获取歌曲的 url
  async [REQUEST_PLAYING_SONG_URL]({ commit }, id) {
    const data = await getSongUrl(id)
    const url = data.data[0].url
    commit(_SET_PLAYING_URL, url)
  },
  // 设置音量
  [SET_VOLUME](context, volume) {
    if (volume > 1 || volume < 0) {
      return
    }
    localCache.setCache(KEY_VOLUME, volume)
    context.commit(_SET_VOLUME, volume)
  }
}
