/*
 * @Author: simonyang
 * @Date: 2022-04-01 16:58:25
 * @LastEditTime: 2022-04-01 17:24:37
 * @LastEditors: simonyang
 * @Description:
 */
import request from '../utils/request'

const ARTIST_LIST = '/artist/list'
const ARTIST_DETAIL = '/artist/detail'
const ARTIST_DESC = '/artist/desc'
const ARTIST_ALBUM = '/artist/album'
const ARTIST_TOP_SONG = '/artist/top/song'
const ARTISTS = '/artists'
const ARTIST_SONGS = '/artist/songs'
const SIMILAR_ARTIST = '/simi/artist'

/**
 * @method: 获取歌手分类列表
 * @param {*} initial 按首英文字母查找, A~Z, -1:热门, 0:其他
 * @param {*} type -1:全部 1:男歌手 2:女歌手 3:乐队
 * @param {*} area -1:全部 7:华语 96:欧美 8:日本 16:韩国 0:其他
 * @param {*} offset 页码偏移量, 默认0
 * @param {*} limit 每页数量限制, 默认30
 */
export function getArtistList(initial, type, area, offset, limit) {
  return request.get(ARTIST_LIST, {
    offset,
    limit,
    initial,
    type,
    area
  })
}

/**
 * @method: 获取歌手详情
 * @param {*} id
 */
export function getArtistDetail(id) {
  return request.get(ARTIST_DETAIL, { id })
}

/**
 * @method: 获取歌手描述
 * @param {*} id
 */
export function getArtistDesc(id) {
  return request.get(ARTIST_DESC, { id })
}

/**
 * @method: 获取歌手专辑
 * @param {*} id
 * @param {*} offset 页码偏移量, 默认0
 * @param {*} limit 每页数量限制, 默认50
 */
export function getArtistAlbum(id, offset, limit) {
  return request.get(ARTIST_ALBUM, { id, offset, limit })
}

/**
 * @method: 获取歌手热门 50 首
 * @param {*} id
 */
export function getArtistTopSong(id) {
  return request.get(ARTIST_TOP_SONG, { id })
}

/**
 * @method: 获取歌手部分信息和热门歌曲
 * @param {*} id
 */
export function getArtists(id) {
  return request.get(ARTISTS, { id })
}

/**
 * @method: 获取歌手全部歌曲
 * @param {*} id
 * @param {*} order hot/time 按照热门/时间排序
 * @param {*} offset 页码偏移量, 默认0
 * @param {*} limit 每页数量限制, 默认50
 */
export function getArtistSongs(id, order, offset, limit) {
  return request.get(ARTIST_SONGS, { id, order, offset, limit })
}

/**
 * @method: 获取相似歌手
 * @param {*} id
 */
export function getSimilarArtist(id) {
  return request.get(SIMILAR_ARTIST, { id })
}
