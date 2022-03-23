/*
 * @Author: simonyang
 * @Date: 2022-03-23 14:50:59
 * @LastEditTime: 2022-03-23 15:33:01
 * @LastEditors: simonyang
 * @Description: 本地缓存, 使用 window.localStorage
 */
class LocalCache {
  setCache(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key) {
    const value = window.localStorage.getItem(key)
    if (!value) {
      return
    }
    return JSON.parse(value)
  }

  deleteCache(key) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
