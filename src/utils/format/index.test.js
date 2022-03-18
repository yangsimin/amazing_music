/* eslint-disable no-undef */
/*
 * @Author: simonyang
 * @Date: 2022-03-17 15:11:04
 * @LastEditTime: 2022-03-18 22:32:54
 * @LastEditors: simonyang
 * @Description:
 */
import { formatSongTime, formatImageUrl, formatPlayCount } from './index'

test('231068 must be 03:51', () => {
  expect(formatSongTime('231068')).toBe('03:51')
})

//58826
test('58826 must be 00:58', () => {
  expect(formatSongTime('58826')).toBe('00:58')
})

test('formatImageUrl', () => {
  expect(formatImageUrl('http://music.jpg', 40, 40)).toBe(
    'http://music.jpg?param=40y40'
  )
})

test('71272736 转成 7127万', () => {
  expect(formatPlayCount(71272736)).toBe('7127万')
})
