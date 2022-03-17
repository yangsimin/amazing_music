/* eslint-disable no-undef */
/*
 * @Author: simonyang
 * @Date: 2022-03-17 15:33:09
 * @LastEditTime: 2022-03-17 15:37:56
 * @LastEditors: simonyang
 * @Description:
 */
import { customImage } from './url'

test('customImage', () => {
  expect(customImage('http://music.jpg', 40, 40)).toBe(
    'http://music.jpg?param=40y40'
  )
})
