/*
 * @Author: simonyang
 * @Date: 2022-03-13 09:59:20
 * @LastEditTime: 2022-03-14 17:28:14
 * @LastEditors: simonyang
 * @Description:
 */
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: '480px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
