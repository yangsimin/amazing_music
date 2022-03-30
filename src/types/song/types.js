/*
 * @Author: simonyang
 * @Date: 2022-03-23 16:38:48
 * @LastEditTime: 2022-03-30 13:40:15
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
    song.url = `https://music.163.com/song/media/outer/url?id=${originSong.id}.mp3`
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
    song.url = `https://music.163.com/song/media/outer/url?id=${originSong.id}.mp3`
    song.picUrl = originSong.al.picUrl
    song.songName = originSong.name
    song.artists = originSong.ar.map(artists => ({
      id: artists.id,
      name: artists.name
    }))
    song.duration = originSong.dt
    song.album = {
      id: originSong.al.id,
      name: originSong.al.name
    }

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
    this.picUrl = originSongList.picUrl || originSongList.coverImgUrl
    this.playCount = originSongList.playCount
  }
}

export class SongListDetail {
  constructor(data) {
    const songListInfo = {
      id: data.playlist.id,
      name: data.playlist.name,
      coverImgUrl: data.playlist.coverImgUrl,
      createTime: data.playlist.createTime,
      description: data.playlist.description,
      tags: data.playlist.tags,
      trackCount: data.playlist.trackCount,
      playCount: data.playlist.playCount,
      trackUpdateTime: data.playlist.trackUpdateTime,
      creator: {
        nickname: data.playlist.creator.nickname,
        avatarUrl: data.playlist.creator.avatarUrl,
        userId: data.playlist.creator.userId
      }
    }
    Object.assign(this, songListInfo)
  }
}
