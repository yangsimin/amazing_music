/*
 * @Author: simonyang
 * @Date: 2022-04-05 14:31:07
 * @LastEditTime: 2022-04-05 14:37:34
 * @LastEditors: simonyang
 * @Description:
 */
import loading from '@/directives/amz-loading'
import InfiniteScroll from '@/directives/infinite-scroll'

export function registerDirective(Vue) {
  Vue.use(loading)
  Vue.use(InfiniteScroll)
}
