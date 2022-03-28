/*
 * @Author: simonyang
 * @Date: 2022-03-23 14:54:07
 * @LastEditTime: 2022-03-28 10:13:31
 * @LastEditors: simonyang
 * @Description:
 */
import { getSongUrl } from '@/api'
import localCache from '@/utils/cache'
import {
  LOAD_PLAYER,
  INSERT_SONGS,
  CLEAR_SONG_LIST,
  SET_PLAYING_URL,
  CHANGE_SONG,
  REQUEST_PLAYING_SONG_URL,
  SET_VOLUME,
  DELETE_SONG
} from '../types/action-types'

import {
  CHANGE_PLAYING_INDEX,
  _INSERT_SONGS,
  _CLEAR_SONG_LIST,
  _SET_PLAYING_URL,
  _SET_VOLUME,
  _DELETE_SONG,
  CHANGE_PLAY_MODE
} from '../types/mutation-types'

import {
  // KEY_PLAYING_INDEX,
  KEY_SONG_LIST,
  KEY_VOLUME,
  KEY_PLAY_MODE
} from '@/types/cache-types'

export default {
  // 加载音量
  // 加载歌单
  // 加载正在播放歌曲的索引值
  [LOAD_PLAYER]({ commit }) {
    // 音量
    const volume = localCache.getCache(KEY_VOLUME)
    if (volume !== undefined) {
      commit(_SET_VOLUME, volume)
    }

    // 歌单
    const songList = localCache.getCache(KEY_SONG_LIST)
    if (songList instanceof Array && songList.length > 0) {
      commit(_INSERT_SONGS, { songs: songList, index: 0 })
    }

    // 当前歌曲索引
    // const playingIndex = localCache.getCache(KEY_PLAYING_INDEX)
    // if (playingIndex !== undefined) {
    //   commit(CHANGE_PLAYING_INDEX, playingIndex)
    // }

    const playMode = localCache.getCache(KEY_PLAY_MODE)
    if (playMode !== undefined) {
      commit(CHANGE_PLAY_MODE, playMode)
    }
  },
  // 插入歌曲到歌单
  [INSERT_SONGS]({ commit, state, dispatch }, songs) {
    if (!(songs instanceof Array) || songs.length === 0) {
      return
    }

    // 1. 添加一首
    if (songs.length === 1) {
      // 判断歌单中是否有这首歌
      const index = state.playlist.findIndex(song => song.id === songs[0].id)
      if (index !== -1) {
        commit(CHANGE_PLAYING_INDEX, index)
        return
      }
      commit(_INSERT_SONGS, { songs, index: state.playingIndex + 1 })
      commit(CHANGE_PLAYING_INDEX, state.playingIndex + 1)
      return
    }
    // 2. 添加多首, 粗暴的方法, 将原有歌曲清空, 再添加
    dispatch(CLEAR_SONG_LIST)
    commit(_INSERT_SONGS, { songs, index: 0 })
    commit(CHANGE_PLAYING_INDEX, 0)

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
  [SET_VOLUME]({ commit }, volume) {
    if (volume > 1 || volume < 0) {
      return
    }
    localCache.setCache(KEY_VOLUME, volume)
    commit(_SET_VOLUME, volume)
  },
  // 删除歌曲
  [DELETE_SONG]({ commit, state }, index) {
    if (index < state.playingIndex) {
      // 当删除的是当前播放之前的, 需要将播放索引往前移动
      commit(CHANGE_PLAYING_INDEX, state.playingIndex - 1)
    } else if (index === state.playingIndex) {
      // 删除的是当前播放的歌曲, 有两种特殊情况
      if (state.playingIndex.length === 1) {
        commit(CHANGE_PLAYING_INDEX, -1)
      } else if (index === state.playlist.length - 1) {
        commit(CHANGE_PLAYING_INDEX, index - 1)
      }
    }
    commit(_DELETE_SONG, index)
    localCache.setCache(KEY_SONG_LIST, state.playlist)
  }
}
