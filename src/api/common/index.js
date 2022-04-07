/*
 * @Author: simonyang
 * @Date: 2022-03-19 11:11:41
 * @LastEditTime: 2022-04-07 17:48:44
 * @LastEditors: simonyang
 * @Description:
 */
import request from '../utils/request.js'

const SONG_URL = '/song/url'
const PLAYLIST_TRACK_URL = '/playlist/track/all'
const PLAYLIST_DETAIL = '/playlist/detail'
const RELATED_PLAYLIST = '/related/playlist'
const ALBUM = '/album'
const LYRIC = '/lyric'

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
 * @param {*} offset, 歌曲偏移量, 默认为0, 相当于页数
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
/**
 * @method: 获取相关歌单推荐
 * @param {*} id 歌单 id
 */
export function getRelatedSongList(id) {
  return request.get(RELATED_PLAYLIST, { id })
}

/**
 * @method: 获取专辑内容
 * @param {*} id
 */
export function getAlbum(id) {
  return request.get(ALBUM, { id })
}

/**
 * @method: 获取歌词
 * @param {*} id
 */
export function getLyric(id) {
  return request.get(LYRIC, { id })
}
