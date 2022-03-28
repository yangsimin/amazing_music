/*
 * @Author: simonyang
 * @Date: 2022-03-23 16:38:48
 * @LastEditTime: 2022-03-28 15:05:55
 * @LastEditors: simonyang
 * @Description:
 */
/**
 * @method 歌曲的数据结构
 * @param {*}
 */
export class Song {
  constructor() {
    this.id = 0
    this.url = ''
    this.picUrl = ''
    this.songName = ''
    this.artists = []
    this.duration = 0
  }
  // <推荐新音乐>接口返回的数据转成 Song
  static createFromNewSong(originSong) {
    const song = new this()

    song.id = originSong.id
    song.picUrl = originSong.picUrl
    song.songName = originSong.name
    song.artists = originSong.song.artists.map(artists => ({
      id: artists.id,
      name: artists.name
    }))
    song.duration = originSong.song.duration

    return song
  }
  // <歌单所有歌曲>接口返回的数据转成 Song
  static createFromSongList(originSong) {
    const song = new this()
    song.id = originSong.id
    song.picUrl = originSong.al.picUrl
    song.songName = originSong.name
    song.artists = originSong.ar.map(artists => ({
      id: artists.id,
      name: artists.name
    }))
    song.duration = originSong.dt

    return song
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
