/*
 * @Author: simonyang
 * @Date: 2022-04-05 14:34:33
 * @LastEditTime: 2022-04-05 21:28:55
 * @LastEditors: simonyang
 * @Description:
 */
import AmzImage from '@/base-ui/amz-image'
import AmzMessage from '@/base-ui/amz-message'

export function registerComponent(Vue) {
  Vue.use(AmzImage)
  Vue.use(AmzMessage)
}
