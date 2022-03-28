/*
 * @Author: simonyang
 * @Date: 2022-03-19 16:43:27
 * @LastEditTime: 2022-03-28 23:04:12
 * @LastEditors: simonyang
 * @Description:
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export function setupStore() {
  store.dispatch('loadPlayer')
}

export default store
