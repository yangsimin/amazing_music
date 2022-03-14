/*
 * @Author: simonyang
 * @Date: 2022-03-13 10:44:27
 * @LastEditTime: 2022-03-14 12:28:24
 * @LastEditors: simonyang
 * @Description:
 */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    parse: 'babel-eslint'
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 'off'
  }
}
