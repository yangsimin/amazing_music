/*
 * @Author: simonyang
 * @Date: 2022-03-14 19:32:25
 * @LastEditTime: 2022-03-17 10:43:54
 * @LastEditors: simonyang
 * @Description:
 */
import Request from './request.js'

const BANNER_URL = '/banner'
const PERSONALIZED_URL = '/personalized'
const PERSONALIZED_NEWSONG_URL = '/personalized/newsong'
const PERSONALIZED_DJPROGRAM_URL = '/personalized/djprogram'

const request = new Request(
  {
    // baseURL: 'http://139.159.153.45:3000',
    baseURL: 'https://music-api.ysmyyds.com',
    response: 'json',
    timeout: 5000,
    withCredentials: true
  },
  null,
  function (response) {
    // console.log('请求结果: ', response)
    const status = response.status
    const data = response.data
    switch (status) {
      case 301:
        return Promise.reject('请登录')
      default:
        // 2xx 都是成功请求
        if (status >= 200 && status < 299) {
          return Promise.resolve(data)
        }
        return Promise.reject(response)
    }
  }
)

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
 * @method: 获取推荐新音乐
 * @param {*} limit 取出数量 , 默认为 10 (不支持 offset)
 */
export const getPersonalizedNewSong = limit =>
  request.get(PERSONALIZED_NEWSONG_URL, { limit })

/**
 * @method: 获取推荐电台
 * @param {*}
 */
export const getPersonalizedDJProgram = () =>
  request.get(PERSONALIZED_DJPROGRAM_URL)
