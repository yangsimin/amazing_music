/*
 * @Author: simonyang
 * @Date: 2022-03-14 18:25:54
 * @LastEditTime: 2022-03-17 17:54:12
 * @LastEditors: simonyang
 * @Description: 封装 axios
 */
import axios from 'axios'
import { BASE_URL, TIME_OUT } from '../config.js'

class Request {
  constructor(config, requestInterceptor, responseInterceptor) {
    this.instance = axios.create(config)

    // 给实例设置请求拦截器
    requestInterceptor &&
      this.instance.interceptors.request.use(requestInterceptor)

    // 给实例设置响应拦截器
    responseInterceptor &&
      this.instance.interceptors.response.use(responseInterceptor)
  }

  get(url, params, config) {
    return this._request('get', url, {
      params,
      ...config
    })
  }

  post(url, data, config) {
    return this._request('post', url, {
      data,
      ...config
    })
  }

  _request(method, url, config) {
    return this.instance.request({
      method,
      url,
      ...config
    })
  }
}

const request = new Request(
  {
    baseURL: BASE_URL,
    response: 'json',
    timeout: TIME_OUT,
    withCredentials: true
  },
  null,
  function (response) {
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

export default request
