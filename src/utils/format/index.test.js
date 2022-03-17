/* eslint-disable no-undef */
/*
 * @Author: simonyang
 * @Date: 2022-03-17 15:11:04
 * @LastEditTime: 2022-03-17 15:14:56
 * @LastEditors: simonyang
 * @Description:
 */
import { getSongTime } from './index'

test('231068 must be 03:51', () => {
  expect(getSongTime('231068')).toBe('03:51')
})

//58826
test('58826 must be 00:58', () => {
  expect(getSongTime('58826')).toBe('00:58')
})
