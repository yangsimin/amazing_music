/*
 * @Author: simonyang
 * @Date: 2022-03-19 11:11:41
 * @LastEditTime: 2022-03-28 14:06:29
 * @LastEditors: simonyang
 * @Description:
 */
import request from '../utils/request.js'

const SONG_URL = '/song/url'
const PLAYLIST_TRACK_URL = '/playlist/track/all'
const PLAYLIST_DETAIL = '/playlist/detail'

/**
 * @method: 根据歌曲的 id 获取对应的 url
 * @param {*} id
 * @param {*} br
 */
export function getSongUrl(id, br) {
  return request.get(SONG_URL, { id, br })
}

/**
 * @method: 获取歌单所有歌曲
 * @param {*} id, 歌单 id
 * @param {*} limit, 限制返回数量, 默认返回歌单所有歌曲
 * @param {*} offset, 歌曲偏移量, 默认为0
 */
export function getSongListTrack(id, limit, offset) {
  return request.get(PLAYLIST_TRACK_URL, { id, limit, offset })
}

/**
 * @method: 获取歌单详情
 * @param {*} id, 歌单 id
 * @param {*} s, 最近 s 个收藏者, 默认为8
 */
export function getSongListDetail(id, s) {
  return request.get(PLAYLIST_DETAIL, { id, s })
}
