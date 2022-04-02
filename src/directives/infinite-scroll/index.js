/*
 * @Author: simonyang
 * @Date: 2022-04-02 11:07:17
 * @LastEditTime: 2022-04-02 11:09:38
 * @LastEditors: simonyang
 * @Description:
 */
import infiniteScroll from './directives'

export default {
  install(Vue) {
    Vue.directive('infinite-scroll', infiniteScroll)
  }
}
