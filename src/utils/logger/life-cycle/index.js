/*
 * @Author: simonyang
 * @Date: 2022-03-15 10:51:36
 * @LastEditTime: 2022-03-26 12:13:06
 * @LastEditors: simonyang
 * @Description:
 */
import Logger from '../index'
export default function (module, debug, options) {
  const Log = Logger.create(module, debug, options)

  return {
    beforeCreate() {
      Log.d('beforeCreate')
    },
    created() {
      Log.d('created')
    },
    beforeMount() {
      Log.d('beforeMount')
    },
    mounted() {
      Log.d('mounted')
    },
    beforeUpdate() {
      Log.d('beforeUpdate')
    },
    updated() {
      Log.d('updated')
    },
    activated() {
      Log.d('activated')
    },
    deactivated() {
      Log.d('deactivated')
    },
    beforeDestroy() {
      Log.d('beforeDestroy')
    },
    destroyed() {
      Log.d('destroyed')
    }
  }
}
