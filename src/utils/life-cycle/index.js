/*
 * @Author: simonyang
 * @Date: 2022-03-15 10:51:36
 * @LastEditTime: 2022-03-15 11:26:06
 * @LastEditors: simonyang
 * @Description:
 */
export default function (showLog) {
  return {
    beforeCreate() {
      showLog && console.log(`[${this.$options.name}] beforeCreate`)
    },
    created() {
      showLog && console.log(`[${this.$options.name}] created`)
    },
    beforeMount() {
      showLog && console.log(`[${this.$options.name}] beforeMount`)
    },
    mounted() {
      showLog && console.log(`[${this.$options.name}] mounted`)
    },
    beforeUpdate() {
      showLog && console.log(`[${this.$options.name}] beforeUpdate`)
    },
    updated() {
      showLog && console.log(`[${this.$options.name}] updated`)
    },
    activated() {
      showLog && console.log(`[${this.$options.name}] activated`)
    },
    deactivated() {
      showLog && console.log(`[${this.$options.name}] deactivated`)
    },
    beforeDestroy() {
      showLog && console.log(`[${this.$options.name}] beforeDestroy`)
    },
    destroyed() {
      showLog && console.log(`[${this.$options.name}] destroyed`)
    }
  }
}
