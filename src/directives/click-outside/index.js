/*
 * @Author: simonyang
 * @Date: 2022-03-29 20:55:09
 * @LastEditTime: 2022-03-29 20:57:43
 * @LastEditors: simonyang
 * @Description:
 */
import clickOutside from './directives'

export default {
  install(Vue) {
    Vue.directive('clickOutside', clickOutside)
  }
}
