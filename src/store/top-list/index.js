/*
 * @Author: simonyang
 * @Date: 2022-03-31 13:59:02
 * @LastEditTime: 2022-03-31 15:12:00
 * @LastEditors: simonyang
 * @Description:
 */
import * as types from '@/types/mutation-types'

export default {
  namespaced: true,
  state: {
    activeId: 0,
    listInfo: {
      name: '',
      description: '',
      playCount: 0,
      coverImgUrl: '',
      updateFrequency: '',
      updateTime: ''
    }
  },
  mutations: {
    [types.CHANGE_ACTIVE_ID](state, id) {
      state.activeId = id
    },
    [types.CHANGE_LIST_INFO](state, listInfo) {
      Object.assign(state.listInfo, listInfo)
    }
  }
}
