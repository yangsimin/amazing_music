<!--
 * @Author: simonyang
 * @Date: 2022-04-04 22:54:19
 * @LastEditTime: 2022-04-11 11:49:07
 * @LastEditors: simonyang
 * @Description: 
-->
<template>
  <div class="song-list-table">
    <header :class="headerRowClassName">
      <span
        :class="headerColClassNames[prop]"
        v-for="prop in props"
        :key="prop"
      >
        {{ headerNames[prop] }}
      </span>
    </header>
    <amz-table
      :props="props"
      :data="songs"
      :colClassNames="colClassNames"
      :rowClassName="rowClassName"
    >
      <template v-slot:index="{ index, row }">
        <!-- 动图 -->
        <playing-icon
          v-if="row.id === playingSong.id"
          class="scale-[0.4]"
        ></playing-icon>
        <!-- 序号 -->
        <div v-else class="w-16 text-center cursor-pointer">
          <span class="group-hover:hidden">{{ index + 1 }}</span>
          <i
            class="hidden iconfont icon-play-music text-red-500 before:text-3xl group-hover:block"
            @click="playMusic(index)"
          >
          </i>
        </div>
      </template>
      <!-- 歌曲 -->
      <template v-slot:songName="{ cell, row }">
        <amz-image
          class="w-10 rounded-md overflow-hidden flex-shrink-0"
          :src="$format.formatImageUrl(row.picUrl, 80, 80)"
        />
        <span class="ml-2 truncate" :class="row.fee === 1 ? 'vip' : ''">
          <slot name="songName" :songName="cell" :song="row">
            {{ cell }}
          </slot>
        </span>
      </template>
      <!-- 歌手 -->
      <template v-slot:artists="{ cell }">
        {{ getArtists(cell) }}
      </template>
      <!-- 专辑 -->
      <template v-slot:album="{ cell }">
        {{ cell.name }}
      </template>
      <!-- 时长 -->
      <template v-slot:duration="{ cell }">
        {{ $format.formatSongTime(cell) }}
      </template>
    </amz-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AmzTable from '@/base-ui/amz-table'
import PlayingIcon from '@/components/playing-icon'

export default {
  name: 'SongListTable',
  components: {
    AmzTable,
    PlayingIcon
  },
  props: {
    songs: Array,
    indexEnable: {
      type: Boolean,
      default: true
    },
    songNameEnable: {
      type: Boolean,
      default: true
    },
    artistsEnable: {
      type: Boolean,
      default: true
    },
    albumEnable: {
      type: Boolean,
      default: true
    },
    durationEnable: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    headerRowClassName: 'flex items-center h-14 text-gray-400 bg-gray-100',
    headerColClassNames: {
      index: 'w-16 text-center',
      songName: 'w-[30%] flex items-center flex-auto ',
      artists: 'w-[30%] flex-shrink flex-auto',
      album: 'w-[22%] flex-shrink flex-auto',
      duration: 'w-20 ml-5'
    },
    headerNames: {
      index: '序号',
      songName: '歌曲',
      artists: '歌手',
      album: '专辑',
      duration: '时长'
    },
    rowClassName:
      'group flex items-center h-14 text-left media:hover:bg-gray-hl even:bg-gray-100',
    colClassNames: {
      index: 'w-16 text-center cursor-pointer',
      songName: 'w-[30%] flex items-center flex-auto flex-shrink-0',
      artists: 'w-[30%] truncate flex-auto flex-shrink-0',
      album: 'w-[22%] truncate flex-auto flex-shrink-0',
      duration: 'w-20 ml-5'
    }
  }),
  computed: {
    ...mapGetters(['playingSong']),
    props() {
      return ['index', 'songName', 'artists', 'album', 'duration'].filter(
        prop => this.$props[prop + 'Enable'] !== false
      )
    }
  },
  methods: {
    ...mapActions(['insertSongs']),
    getArtists(artists) {
      return artists.map(artist => artist.name).join(' / ')
    },
    playMusic(index) {
      this.insertSongs([this.songs[index]])
    }
  }
}
</script>

<style scoped>
.vip::after {
  content: 'vip';
  @apply ml-2 px-1 border rounded border-red-600 text-red-600;
}
</style>
