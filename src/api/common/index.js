/*
 * @Author: simonyang
 * @Date: 2022-03-19 11:11:41
 * @LastEditTime: 2022-03-23 22:32:49
 * @LastEditors: simonyang
 * @Description:
 */
import request from '../utils/request.js'

const SONG_URL = '/song/url'
const SONGLIST_TRACK_URL = '/playlist/track/all'
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
  return request.get(SONGLIST_TRACK_URL, { id, limit, offset })
}
