/*
 * @Author: simonyang
 * @Date: 2022-03-14 19:32:25
 * @LastEditTime: 2022-03-14 21:04:43
 * @LastEditors: simonyang
 * @Description:
 */
import Request from './request.js'
// /banner?type=0   0:pc 1:android 2:iphone 3:ipad
const BANNER_URL = '/banner'

const request = new Request(
  {
    baseURL: 'http://139.159.153.45:3000',
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

export function getBanner() {
  return request.get(BANNER_URL)
}
