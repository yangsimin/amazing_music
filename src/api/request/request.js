/*
 * @Author: simonyang
 * @Date: 2022-03-14 18:25:54
 * @LastEditTime: 2022-03-14 20:15:05
 * @LastEditors: simonyang
 * @Description: 封装 axios
 */
import axios from 'axios'

export default class Request {
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
