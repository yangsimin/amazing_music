/*
 * @Author: simonyang
 * @Date: 2022-04-05 16:58:16
 * @LastEditTime: 2022-04-05 17:36:16
 * @LastEditors: simonyang
 * @Description:
 */
import request from '../utils/request'

const SEARCH = '/search'
const CLOUD_SEARCH = '/cloudsearch'
const SEARCH_HOT = '/search/hot'
const SEARCH_SUGGEST = '/search/suggest'

/**
 * @method: 搜索关键字
 * @param {*} keywords 关键字
 * @param {*} type 1: 单曲(默认), 10: 专辑, 100: 歌手, 1000:
歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
 * @param {*} offset
 * @param {*} limit
 */
export function getSearch(keywords, type, offset, limit) {
  return request.get(SEARCH, { keywords, type, offset, limit })
}

/**
 * @method: 搜索关键字 (详细)
 * @param {*} keywords
 * @param {*} type
 */
export function getCloudSearch(keywords, type) {
  return request.get(CLOUD_SEARCH, { keywords, type })
}

/**
 * @method: 热搜列表 (简略)
 * @param {*}
 */
export function getSearchHot() {
  return request.get(SEARCH_HOT)
}

/**
 * @method: 获取搜索建议
 * @param {*} keywords
 */
export function getSearchSuggest(keywords) {
  return request.get(SEARCH_SUGGEST, { keywords })
}
