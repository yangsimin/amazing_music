/*
 * @Author: simonyang
 * @Date: 2022-03-24 14:32:14
 * @LastEditTime: 2022-03-31 16:01:25
 * @LastEditors: simonyang
 * @Description:
 * 用法:
 * const Log = ConsoleLogger.create('AmzPlayer', true, { time: true, date: true })
 * Log.i('something...')
 */
import { formatDate } from '../format/index.js'

// 全局 DEBUG 开关
const GLOBAL_DEBUG = process.env.NODE_ENV !== 'production'
const DEFAULT_OPTIONS = { time: true, date: false }
const DATE_FORMAT = 'yyyy-MM-dd'
const TIME_FORMAT = 'HH:mm:ss.SSS'

// 定义公共函数
const baseLogger = {
  // info
  i(...messages) {
    if (GLOBAL_DEBUG && this.debug) {
      const header = this._getHeader('INFO')
      console.info(header, ...messages)
    }
  },
  // debug
  d(...messages) {
    if (GLOBAL_DEBUG && this.debug) {
      const header = this._getHeader('DEBUG')
      console.log(header, ...messages)
    }
  },
  // warning
  w(...messages) {
    if (GLOBAL_DEBUG && this.debug) {
      const header = this._getHeader('WARNING')
      console.warn(header, ...messages)
    }
  },
  // error
  e(...messages) {
    if (GLOBAL_DEBUG && this.debug) {
      const header = this._getHeader('ERROR')
      console.error(header, ...messages)
    }
  },
  _getHeader(level) {
    let headerInfo = ''
    const timestamp = Date.now()
    if (this.options) {
      if (this.options.date) {
        const date = formatDate(DATE_FORMAT, timestamp)
        headerInfo = headerInfo + date
      }
      if (this.options.time) {
        const time = formatDate(TIME_FORMAT, timestamp)
        headerInfo = headerInfo + ' ' + time
      }
    }
    headerInfo += ` ${level} [${this.module}]`

    return headerInfo
  }
}

const ConsoleLogger = {
  create(module = 'noname', debug = true, options = DEFAULT_OPTIONS) {
    // 使用原型链继承, 创建子对象, 并将 baseLogger 作为他的原型对象
    const logger = Object.create(baseLogger)
    logger.module = module
    logger.debug = debug
    logger.options = options
    return logger
  }
}

export default ConsoleLogger
