/*
 * @Author: simonyang
 * @Date: 2022-03-17 13:57:22
 * @LastEditTime: 2022-03-17 14:35:37
 * @LastEditors: simonyang
 * @Description:
 */

import request from '../utils/request.js'

const BANNER_URL = '/banner'
const PERSONALIZED_URL = '/personalized'
const PERSONALIZED_NEWSONG_URL = '/personalized/newsong'
const PERSONALIZED_DJPROGRAM_URL = '/personalized/djprogram'

/**
 * @method 获取Banner
 * @param type 0:pc 1:android 2:iphone 3:ipad, 默认为0
 * @return {*}
 */
export const getBanner = () => request.get(BANNER_URL)

/**
 * @method: 获取推荐歌单
 * @param {*} limit 取出数量, 默认为 30 (不支持 offset)
 * @return {*}
 */
export const getPersonalized = limit => request.get(PERSONALIZED_URL, { limit })

/**
 * @method 获取推荐新音乐
 * @param {*} limit 取出数量 , 默认为 10 (不支持 offset)
 */
export const getPersonalizedNewSong = limit =>
  request.get(PERSONALIZED_NEWSONG_URL, { limit })

/**
 * @method 获取推荐电台
 * @param {*}
 */
export const getPersonalizedDJProgram = () =>
  request.get(PERSONALIZED_DJPROGRAM_URL)

/**
 * @method 歌曲的数据结构
 * @param {*}
 */
export class Song {
  constructor(originSong) {
    this.picUrl = originSong.picUrl
    this.songName = originSong.name
    this.id = originSong.id
    this.artists = originSong.song.artists.map(artists => artists.name)
    this.duration = originSong.song.duration
  }
}
