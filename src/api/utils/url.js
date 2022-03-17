/*
 * @Author: simonyang
 * @Date: 2022-03-17 15:24:45
 * @LastEditTime: 2022-03-17 15:40:45
 * @LastEditors: simonyang
 * @Description:
 */
/**
 * @method: 获取特定尺寸的图片url
 * @param {*} imageUrl 图片 url
 * @param {*} width 指定图片宽
 * @param {*} height 指定图片高
 */
export function customImage(imageUrl, width, height) {
  return `${imageUrl}?param=${width}y${height}`
}
