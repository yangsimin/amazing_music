/*
 * @Author: simonyang
 * @Date: 2022-03-31 10:28:16
 * @LastEditTime: 2022-03-31 10:29:17
 * @LastEditors: simonyang
 * @Description:
 */
import request from '../utils/request'

const TOP_LIST = '/toplist'

/**
 * @method: 获取所有榜单
 * @param {*}
 */
export function getTopList() {
  return request.get(TOP_LIST)
}
