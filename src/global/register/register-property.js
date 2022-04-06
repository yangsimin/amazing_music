/*
 * @Author: simonyang
 * @Date: 2022-04-06 13:41:38
 * @LastEditTime: 2022-04-06 13:58:03
 * @LastEditors: simonyang
 * @Description:
 */
import * as format from '@/utils/format'

export function registerProperty(Vue) {
  Vue.prototype.$format = format
}
