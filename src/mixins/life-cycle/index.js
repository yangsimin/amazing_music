/*
 * @Author: simonyang
 * @Date: 2022-03-15 10:51:36
 * @LastEditTime: 2022-04-06 14:40:16
 * @LastEditors: simonyang
 * @Description:
 */
import Logger from '@/utils/logger'
export default function (debug, options) {
  let Log = null

  return {
    beforeCreate() {
      Log = Logger.create(this.$options.name, debug, options)
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
