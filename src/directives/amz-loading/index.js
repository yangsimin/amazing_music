/*
 * @Author: simonyang
 * @Date: 2022-03-29 16:09:19
 * @LastEditTime: 2022-03-29 16:18:05
 * @LastEditors: simonyang
 * @Description:
 */
import loading from './directive'

export default {
  install(Vue) {
    Vue.directive('amzLoading', loading)
  }
}
