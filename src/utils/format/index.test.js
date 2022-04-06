/* eslint-disable no-undef */
/*
 * @Author: simonyang
 * @Date: 2022-03-17 15:11:04
 * @LastEditTime: 2022-04-06 22:32:40
 * @LastEditors: simonyang
 * @Description:
 */
import { formatSongTime, formatImageUrl, formatTimeToSecond } from './index'

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

test('formatTimeToSecond', () => {
  expect(formatTimeToSecond('03:56.123')).toBe(236.123)
})
test('formatTimeToSecond', () => {
  expect(formatTimeToSecond('03:61.123')).toBe(undefined)
})
test('formatTimeToSecond', () => {
  expect(formatTimeToSecond('03:56.12')).toBe(236.12)
})
test('formatTimeToSecond', () => {
  expect(formatTimeToSecond('03:56')).toBe(236)
})
