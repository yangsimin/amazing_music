/*
 * @Author: simonyang
 * @Date: 2022-03-28 22:25:17
 * @LastEditTime: 2022-03-28 22:58:47
 * @LastEditors: simonyang
 * @Description:
 *    playingSong
 *      1. 有值, 表示正在播放可以歌曲
 *      2. null, 表示未播放歌曲
 *    playingIndex
 *      1. 有值, 表示正在播放歌曲
 *      2. -1, 表示未播放歌曲
 *
 *    未播放歌曲的场景
 *      1. 歌曲列表为空
 *      2. 顺序播放(未实现该模式), 歌曲列表播放完最后一首
 */
export default {
  // 当前正在播放的歌曲索引
  playingIndex: -1,
  // 播放列表
  playlist: [],
  isPlaying: false,
  volume: 0.4,
  playMode: 0
}
