/*
 * @Author: simonyang
 * @Date: 2022-03-19 11:11:41
 * @LastEditTime: 2022-03-19 11:18:38
 * @LastEditors: simonyang
 * @Description:
 */
import request from '../utils/request.js'

const SONG_URL = '/song/url'
/**
 * @method: 根据歌曲的 id 获取对应的 url
 * @param {*} id
 * @param {*} br
 */
export function getSongUrl(id, br) {
  return request.get(SONG_URL, { id, br })
}
