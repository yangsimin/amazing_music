/*
 * @Author: simonyang
 * @Date: 2022-04-05 20:58:00
 * @LastEditTime: 2022-04-05 21:26:51
 * @LastEditors: simonyang
 * @Description:
 */
import AmzMessage from './src/AmzMessage'

export default function install(Vue) {
  const Constructor = Vue.extend(AmzMessage)
  const amzMessage = new Constructor()
  amzMessage.$mount(document.createElement('div'))
  document.body.append(amzMessage.$el)
  Vue.prototype.$message = amzMessage
}
