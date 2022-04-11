/*
 * @Author: simonyang
 * @Date: 2022-03-30 14:51:17
 * @LastEditTime: 2022-04-11 12:27:01
 * @LastEditors: simonyang
 * @Description:
 */
export default {
  activated() {
    console.log('restore-scroll', this._amz_scrollY)
    if (this._amz_scrollY) {
      document.body.scrollTo(0, this._amz_scrollY)
    }
  },

  beforeRouteLeave(to, from, next) {
    this._amz_scrollY = document.body.scrollTop
    console.log('restore-scroll', this._amz_scrollY)
    next()
  }
}
