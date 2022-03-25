/*
 * @Author: simonyang
 * @Date: 2022-03-19 16:43:27
 * @LastEditTime: 2022-03-25 14:35:29
 * @LastEditors: simonyang
 * @Description:
 *    playingSong
 *      1. 有值, 表示正在播放可以歌曲
 *      2. null, 表示未播放歌曲
 *    playingIndex
 *      1. 有值, 表示正在播放歌曲
 *      2. -1, 表示未播放歌曲
 *
 *    未播放歌曲的场景
 *      1. 歌曲列表为空
 *      2. 顺序播放(未实现该模式), 歌曲列表播放完最后一首
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/dist/logger'
import actions from './actions'
import mutations from './mutations'

import { LOAD_PLAYER } from '../types/action-types'

Vue.use(Vuex)

const store = new Vuex.Store({
  // plugins: [createLogger()],
  state: () => ({
    // 当前正在播放的歌曲索引
    playingIndex: -1,
    // 播放列表
    playlist: [],
    volume: 0.4,
    playMode: 0
  }),
  getters: {
    // 当前正在播放的歌曲对象
    playingSong(state) {
      if (state.playlist.length === 0 || state.playingIndex < 0) {
        return null
      }
      return state.playlist[state.playingIndex]
    }
  },
  mutations,
  actions
})

export function setupStore() {
  store.dispatch(LOAD_PLAYER)
}

export default store
