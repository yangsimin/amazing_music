/*
 * @Author: simonyang
 * @Date: 2022-03-19 16:43:27
 * @LastEditTime: 2022-03-21 16:13:13
 * @LastEditors: simonyang
 * @Description:
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const store = new Vuex.Store({
  // plugins: [createLogger()],
  state: () => ({
    playingIndex: 0,
    songList: []
  }),
  getters: {
    playingSong(state) {
      if (state.songList.length === 0) {
        return {}
      }
      return state.songList[state.playingIndex]
    }
  },
  mutations: {
    changePlayingIndex(state, index) {
      state.playingIndex = index
    },
    insertSongs(state, songs) {
      state.songList.unshift(...songs)
    }
  },
  actions: {
    changeSong({ commit, state }, { mode, next }) {
      // mode: 0列表循环, 1单曲循环, 2随机播放
      // next: true下一首, false上一首
      let playingIndex = -1
      const length = state.songList.length
      switch (mode) {
        case 0: //列表循环
          if (!next && state.playingIndex === 0) {
            playingIndex = length - 1
          } else if (next && state.playingIndex === length - 1) {
            playingIndex = 0
          } else {
            const step = next ? 1 : -1
            playingIndex = state.playingIndex + step
          }
          break
        case 1: // 单曲循环
          playingIndex = state.playingIndex
          break
        case 2: // 随机播放
          // 随机选择, 无法追溯顺序, 待优化
          playingIndex = Math.random() * (length - 1)
          break
      }
      commit('changePlayingIndex', playingIndex)
    }
  }
})

export default store
