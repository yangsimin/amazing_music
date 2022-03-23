/*
 * @Author: simonyang
 * @Date: 2022-03-23 16:38:48
 * @LastEditTime: 2022-03-23 23:43:21
 * @LastEditors: simonyang
 * @Description:
 */
/**
 * @method 歌曲的数据结构
 * @param {*}
 */
export class Song {
  constructor(originSong) {
    this.id = originSong.id
    this.url = ''
    this.picUrl = originSong.picUrl
    this.songName = originSong.name
    if (originSong.song) {
      // 推荐新音乐返回的字段
      this.artists = originSong.song.artists.map(artists => ({
        id: artists.id,
        name: artists.name
      }))
      this.duration = originSong.song.duration
    }
  }
}
/**
 * @method 歌单的数据结构
 * @param {*}
 */
export class SongList {
  constructor(originSongList) {
    this.id = originSongList.id
    this.name = originSongList.name
    this.picUrl = originSongList.picUrl
    this.playCount = originSongList.playCount
  }
}
