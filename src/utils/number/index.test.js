/*
 * @Author: simonyang
 * @Date: 2022-03-30 17:15:02
 * @LastEditTime: 2022-03-30 17:27:12
 * @LastEditors: simonyang
 * @Description:
 */
import { range } from './index'

test('range(0, 5) must be [0, 1, 2, 3, 4]', () => {
  expect(range(0, 5)).toEqual([0, 1, 2, 3, 4])
})
