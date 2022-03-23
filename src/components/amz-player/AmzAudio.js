/*
 * @Author: simonyang
 * @Date: 2022-03-22 08:48:45
 * @LastEditTime: 2022-03-23 13:58:38
 * @LastEditors: simonyang
 * @Description:
 */
export default class AmzAudio {
  constructor(audio) {
    this._audio = audio
  }
  setSource(url) {
    this._audio.src = url
  }
  getSource() {
    return this._audio.currentSrc
  }
  getVolume() {
    return this._audio.volume
  }
  setVolume(volume) {
    if (volume > 1 || volume < 0) {
      throw RangeError('volume should be 0 ~ 1.0')
    }
    this._audio.volume = volume
  }
  play() {
    this._audio.play()
  }
  pause() {
    this._audio.pause()
  }
  getCurrentTime() {
    return this._audio.currentTime
  }
  setCurrentTime(time) {
    this._audio.currentTime = time
  }
  getDuration() {
    return this._audio.duration
  }
  getLoadProgress() {
    let timeRanges = this._audio.buffered
    let timeBuffered = timeRanges.end(timeRanges.length - 1)
    return timeBuffered / this._audio.duration
  }
  getProgress() {
    return this._audio.currentTime / this._audio.duration
  }
  reset() {
    this._audio.currentTime = 0
  }
}
