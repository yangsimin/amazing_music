/*
 * @Author: simonyang
 * @Date: 2022-03-23 16:38:48
 * @LastEditTime: 2022-04-07 20:36:29
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
  static createFromNewSong(data) {
    const song = new this()

    song.id = data.id
    song.url = `https://music.163.com/song/media/outer/url?id=${data.id}.mp3`
    song.picUrl = data.picUrl
    song.songName = data.name
    song.artists = data.song.artists.map(artists => ({
      id: artists.id,
      name: artists.name
    }))
    song.duration = data.song.duration
    song.album = {
      id: data.song.album.id,
      name: data.song.album.name
    }

    return song
  }
  // <歌单所有歌曲>接口返回的数据转成 Song
  static createFromSongList(data) {
    const song = new this()
    song.id = data.id
    song.url = `https://music.163.com/song/media/outer/url?id=${data.id}.mp3`
    song.picUrl = data.al.picUrl
    song.songName = data.name
    song.artists = data.ar.map(artists => ({
      id: artists.id,
      name: artists.name
    }))
    song.duration = data.dt
    song.album = {
      id: data.al.id,
      name: data.al.name
    }
    song.alias = data.alia
    // fee 0: 免费或无版权 1: VIP 歌曲 4: 购买专辑 8: 非会员可免费播放低音质，会员可播放高音质及下载
    song.fee = data.fee
    return song
  }
}
/**
 * @method 歌单的数据结构
 * @param {*}
 */
export class SongList {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.picUrl = data.picUrl || data.coverImgUrl
    this.playCount = data.playCount
    this.topListType = data.ToplistType || ''
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
      trackIds: data.playlist.trackIds.map(each => each.id),
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
/**
 * @method: 榜单信息
 * @param {*}
 */
export class ListInfo {
  constructor(data) {
    const listInfo = {
      id: data.id,
      name: data.name,
      description: data.description,
      playCount: data.playCount,
      coverImgUrl: data.coverImgUrl,
      updateFrequency: data.updateFrequency,
      updateTime: data.updateTime
    }
    Object.assign(this, listInfo)
  }
}
/**
 * @method: 歌手信息
 * @param {*}
 */
export class Singer {
  constructor(data) {
    const singer = {
      id: data.id,
      name: data.name,
      picUrl: data.img1v1Url,
      musicSize: data.musicSize,
      albumSize: data.albumSize,
      mvSize: data.mvSize,
      alias: data.alias,
      briefDesc: data.briefDesc
    }
    Object.assign(this, singer)
  }
}
/**
 * @method: 简单的专辑信息
 * @param {*}
 */
export class Album {
  constructor(data) {
    const album = {
      id: data.id,
      name: data.name,
      publishTime: data.publishTime,
      picUrl: data.picUrl,
      size: data.size,
      paid: data.paid
    }
    Object.assign(this, album)
  }
}

/**
 * @method: 专辑详情
 * @param {*}
 */
export class AlbumDetail {
  constructor(data) {
    const albumDetail = {
      id: data.id,
      name: data.name,
      picUrl: data.picUrl,
      publishTime: data.publishTime,
      description: data.description,
      company: data.company,
      artist: data.artist,
      alias: data.alias
    }
    Object.assign(this, albumDetail)
  }
}
