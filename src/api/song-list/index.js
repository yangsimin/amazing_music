/*
 * @Author: simonyang
 * @Date: 2022-03-29 21:04:51
 * @LastEditTime: 2022-03-29 21:42:20
 * @LastEditors: simonyang
 * @Description:
 */
import request from '../utils/request'

const CATE_LIST = '/playlist/catlist'
const HOT_CATE = '/playlist/hot'
const TOP_LIST = '/top/playlist'

/**
 * @method: 获取歌单分类
 * @param {*}
 */
export function getCateList() {
  return request.get(CATE_LIST)
}
/**
 * @method: 获取热门类别
 * @param {*}
 */
export function getHotCate() {
  return request.get(HOT_CATE)
}

/**
 * @method: 获取 最新/最热 歌单
 * @param {*} order 可选, new / hot
 * @param {*} cat   可选, 类别tag, 比如"华语", "古风"等, 默认为 "全部"
 * @param {*} limit 可选, 数量限制, 默认为50
 * @param {*} offset  可选, 偏移量, 用于分页, (页数 - 1) * 50
 */
export function getTopList(cat, limit, offset, order) {
  return request.get(TOP_LIST, { order, cat, limit, offset })
}
