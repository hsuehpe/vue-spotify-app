<template>
  <div :class="elClass">
    <router-link tag="div" :to="createUrl()" class="cover">
      <img
        v-if="coverImg[0]"
        v-lazy="coverImg[0].url"
        :alt="name + '-cover'"
        class="cover-inner"
      >
      <div v-else class="cover-inner" />
      <div class="cover-hover">
        <Icon class="play" icon="el-play-alt" @click.prevent="onPlay" />
        <Icon class="sound-on" icon="akar-icons:sound-on" />
        <Icon class="pause" icon="el-pause-alt" @click.prevent="onPause" />
      </div>
    </router-link>
    <div class="info">
      <div>
        <router-link class="name" :to="createUrl()">
          {{ name }}
        </router-link>
        <div
          v-if="artists"
        >
          <router-link
            v-for="(artist, index) in artists"
            :key="artist.id"
            class="artist"
            :to="{ name: 'artist', params: { id: artist.id } }"
          >
            {{ artist.name }}
            <template v-if="index !== artists.length - 1">
              ,&nbsp;
            </template>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import playerApi from '/~/api/spotify/player'

interface CoverImg {
  url: string
}

interface Artist {
  id: string
  name: string
}

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    uri: {
      required: true,
      type: String,
    },
    coverImg: {
      required: true,
      type: Array as () => Array<CoverImg>,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    artists: {
      type: Array as () => Array<Artist>,
      default: [],
    },
  },
  setup(props) {
    const store = useStore()
    const getters = store.getters
    const playbackContext = computed(() => getters['PlayerModule/getPlaybackContext'])
    const mediaPlaying = computed(() => playbackContext.value && !playbackContext.value.paused && playbackContext.value.context.uri && playbackContext.value.context.uri.includes(props.id))
    const mediaActive = computed(() => playbackContext.value && playbackContext.value.context.uri && playbackContext.value.context.uri.includes(props.id))
    const mediaEmpty = computed(() => !props.coverImg[0])
    const elClass = computed(() => ['media-object', { playing: mediaPlaying.value, active: mediaActive.value, 'no-image': mediaEmpty.value }])
    const user = getters['UserModule/getProfile']

    const createUrl = () => {
      const chunks = props.uri.split(':')
      let url = null
      switch (props.type) {
        case 'album':
          url = { name: 'album', params: { id: props.id } }
          break

        case 'artist':
          url = { name: 'artist', params: { id: props.id } }
          break

        case 'playlist':
          url = {
            name: 'playlist',
            params: {
              user_id: user.id,
              playlist_id: chunks[chunks.length - 1],
            },
          }
          break
      }

      return url
    }

    const onPlay = (e: Event) => {
      e.stopPropagation()
      if (
        playbackContext.value
          && playbackContext.value.context.uri
          && playbackContext.value.context.uri.includes(props.id)
      )
        playerApi.play()
      else
        playerApi.play(props.uri)
    }

    const onPause = (e: Event) => {
      e.stopPropagation()
      playerApi.pause()
    }

    return {
      elClass,
      createUrl,
      onPlay,
      onPause,
    }
  },
})

</script>

<style lang="postcss" scoped>
.media-object {
  @apply sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2;
  &:hover .play {
    @apply block;
  }

  &.active {
    .name {
      color: #1db954;
    }
  }

  &.playing {
    .sound-on {
      @apply block;
    }

    &:hover {
      .pause {
        @apply block;
      }

      .play,
      .sound-on {
        @apply hidden;
      }
    }
  }

  & .play, & .pause, & .sound-on {
    @apply hidden;
  }

  & .cover {
    min-width: 130px;
    padding-top: 100%;
    @apply relative block;
  }

  & .cover:hover, & .cover-hover {
    background: rgba(0, 0, 0, .6);
  }

  & .cover-inner {
    @apply absolute top-0 w-full h-full bg-gray-50;
  }

  & .cover-hover {
    @apply block absolute top-0 w-full h-full;
  }

  & .cover-hover > div {
    @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white outline-none text-3xl;
  }

  & .info {
    @apply mt-1 text-xs leading-5;
  }

  & .name {
    @apply text-white cursor-pointer;

    &:hover {
      @apply underline;
    }
  }

  & .artist {
    @apply text-gray-500 no-underline;
    &:hover {
      @apply text-white underline;
    }
  }

  & .avatar {
    background-color: #737575;
    @apply relative w-full h-full;
  }

  & .music-icon {
    @apply top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 h-2/5;
  }
}
</style>
