/*
 * @Author: simonyang
 * @Date: 2022-04-05 14:29:12
 * @LastEditTime: 2022-04-06 13:43:32
 * @LastEditors: simonyang
 * @Description:
 */
import { registerDirective } from './register/register-directive'
import { registerComponent } from './register/register-component'
import { registerProperty } from './register/register-property'

export function registerPlugin(Vue) {
  Vue.use(registerDirective)
  Vue.use(registerComponent)
  Vue.use(registerProperty)
}
