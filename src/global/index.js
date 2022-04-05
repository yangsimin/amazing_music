/*
 * @Author: simonyang
 * @Date: 2022-04-05 14:29:12
 * @LastEditTime: 2022-04-05 14:40:00
 * @LastEditors: simonyang
 * @Description:
 */
import { registerDirective } from './register/register-directive'
import { registerComponent } from './register/register-component'

export function registerPlugin(Vue) {
  Vue.use(registerDirective)
  Vue.use(registerComponent)
}
