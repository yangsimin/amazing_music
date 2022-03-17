/*
 * @Author: simonyang
 * @Date: 2022-03-17 17:50:43
 * @LastEditTime: 2022-03-17 17:55:48
 * @LastEditors: simonyang
 * @Description:
 */
let BASE_URL = ''
const TIME_OUT = 5000

switch (process.env.NODE_ENV) {
  case 'development':
    BASE_URL = 'http://127.0.0.1:3000'
    break
  case 'production':
    BASE_URL = 'https://music-api.ysmyyds.com'
    break
}

export { BASE_URL, TIME_OUT }
