/*
 * @Author: simonyang
 * @Date: 2022-03-30 14:51:17
 * @LastEditTime: 2022-03-30 14:57:08
 * @LastEditors: simonyang
 * @Description:
 */
export default {
  activated() {
    if (this._amz_scrollY) {
      document.body.scrollTo(0, this._amz_scrollY)
    }
  },
  deactivated() {
    this._amz_scrollY = document.body.scrollTop
  }
}
