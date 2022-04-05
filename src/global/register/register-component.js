/*
 * @Author: simonyang
 * @Date: 2022-04-05 14:34:33
 * @LastEditTime: 2022-04-05 23:37:39
 * @LastEditors: simonyang
 * @Description:
 */
import AmzImage from '@/base-ui/amz-image'
import AmzMessage from '@/base-ui/amz-message'
import AmzBackTop from '@/base-ui/amz-back-top'

export function registerComponent(Vue) {
  Vue.use(AmzImage)
  Vue.use(AmzMessage)
  Vue.use(AmzBackTop)
}
