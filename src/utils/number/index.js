/*
 * @Author: simonyang
 * @Date: 2022-03-30 17:10:05
 * @LastEditTime: 2022-03-30 17:18:26
 * @LastEditors: simonyang
 * @Description:
 */
/**
 * @method: 创建一组数字
 * @param {*} start 起始值, 包含
 * @param {*} stop 终止值, 不包含
 * @param {*} step 步长
 */
export function range(start, stop, step = 1) {
  const arr = []
  for (let i = start; i < stop; i = i + step) {
    arr.push(i)
  }
  return arr
}
