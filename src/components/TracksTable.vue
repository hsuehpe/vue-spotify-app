<template>
  <div v-if="!!tracks.length" class="tracks-table">
    <div class="row header">
      <div class="cell playback" />
      <div class="cell addition" />
      <div class="cell name">
        Title
      </div>
      <div class="cell artist">
        Artist
      </div>
      <div class="cell album">
        Album
      </div>
      <div class="cell added-at">
        <Icon icon="bx-bxs-calendar " />
      </div>
      <div class="cell duration">
        <Icon icon="ant-design:clock-circle-filled" />
      </div>
    </div>
    <div
      v-for="(item, index) in tracks"
      :key="index"
      class="row"
      :class="isActiveTrack(item.track)"
      :data-id="item.track.id"
    >
      <div class="cell playback">
        <track-playback
          :track-uri="item.track.uri"
          :tracks-uris="data.tracksUris"
          :context-uri="contextUri"
          :offset="index"
        />
      </div>

      <div class="cell addition">
        <track-addition
          :track-i-d="item.track.id"
          :is-saved="data.savedTracks[index]"
          @updateTrackstatus="onTrackUpdate"
          @savedTrackRemove="onSavedTrackRemove"
        />
      </div>

      <div class="cell">
        {{ item.track.name }}
        <span v-if="item.track.explicit" class="explicit-label">
          Explicit
        </span>
      </div>

      <div class="cell">
        <div>
          <router-link
            v-for="(artist, index) in item.track.artists"
            :key="index"
            class="link"
            :to="{ name: 'artist', params: { id: artist.id } }"
          >
            {{ artist.name }}
            <template v-if="index !== item.track.artists.length - 1">
              ,&nbsp;
            </template>
          </router-link>
        </div>
      </div>

      <div class="cell">
        <router-link
          class="link"
          :to="{ name: 'album', params: { id: item.track.album.id } }"
        >
          {{ item.track.album.name }}
        </router-link>
      </div>

      <div class="cell added-at">
        {{ dateFormat(item.added_at) }}
      </div>

      <div class="cell duration">
        {{ msToMinutes(item.track.duration_ms) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import moment from 'moment'
import { msToMinutes } from '/~/logics/time-format'
import { useStore } from 'vuex'
import TrackAddition from './TrackAddition.vue'
import TrackPlayback from './TrackPlayback.vue'
import libraryApi from '/~/api/spotify/library'

interface Artist {
  external_urls: object
  href: string
  id: string
  name: string
  type: string
  uri: string
}

interface Album {
  album_type: string
  artists: Array<Artist>
  name: string
  id: string
}

interface TrackItem {
  name: string
  uri: string
  id: string
  explicit: boolean
  artists: Array<Artist>
  album: Album
  duration_ms: number
}

interface Tracks {
  track: TrackItem
  added_at: number
}

export default defineComponent({
  components: {
    TrackPlayback,
    TrackAddition,
  },
  props: {
    tracks: {
      type: Array as () => Array<Tracks>,
      required: true,
      default: () => [],
    },
    type: {
      type: String,
      require: false,
    },
    contextUri: {
      required: false,
    },
  },
  setup(props) {
    const store = useStore()
    const getters = store.getters
    const user = getters['UserModule/getProfile']
    const playback = computed(() => getters['PlayerModule/getPlayback'])
    const playbackContext = computed(() => getters['PlayerModule/getPlaybackContext'])

    const data = reactive({
      tracksUris: [] as Array<string>,
      tracksIds: [] as Array<string>,
      savedTracks: [],
    })

    const dateFormat = (timestamp: number) => moment(timestamp).format('MM-DD-YYYY')

    const fetchTrackUris = () => {
      data.tracksUris = props.tracks.map((el) => {
        return el.track.uri
      })
    }

    const fetchTrackIds = () => {
      data.tracksIds = props.tracks.map((el) => {
        return el.track.id
      })
    }

    const checkSavedTracks = async() => {
      try {
        const saved = {
          offset: 0,
          limit: 50,
          total: props.tracks.length || 0,
          items: [] as any,
        }

        while (saved.total > saved.offset) {
          const res = await libraryApi.checkUserSavedTracks(
            data.tracksIds
              .slice(saved.offset, saved.offset + saved.limit)
              .toString(),
          )
          saved.offset = saved.offset + saved.limit
          saved.items.push(...res.data)
        }

        data.savedTracks = saved.items
      }
      catch (e) {
        console.log(e)
      }
    }

    const isActiveTrack = (current: TrackItem) => {
      const isActiveTrack = playback.value.item && playback.value.item.id === current.id
      return {
        '--active': isActiveTrack,
        '--paused': isActiveTrack && playbackContext && playbackContext.value.paused,
      }
    }

    const onTrackUpdate = () => {
      checkSavedTracks()
    }

    const onSavedTrackRemove = (id: string) => {
      if (props.type === 'library')
        document.querySelectorAll(`[data-id=${id}]`)[0].remove()
    }

    return {
      fetchTrackUris,
      fetchTrackIds,
      checkSavedTracks,
      isActiveTrack,
      onTrackUpdate,
      onSavedTrackRemove,
      data,
      dateFormat,
      msToMinutes,
    }
  },
})
</script>

<style lang="postcss" scoped>
.tracks-table {
  @apply flex flex-col pt-0 px-4 pb-5;

  & .link {
    @apply text-white;
    &:hover {
      @apply underline;
    }
  }

  .row {
    min-height: 40px;
    border-bottom: 1px solid #333;
    @apply flex relative p-1 text-white text-xs;

    &:hover {
      &:not(:first-of-type) {
        background-color: #333;
        @apply text-white;
      }

      .explicit-label {
        @apply text-white border-white
      }

      .addition-button {
        @apply text-white;
      }

      .track-playback {
        @apply block;
      }
    }

    &.header {
      color: #959595;
      @apply uppercase;
    }

    &.active {
      background-color: #333;
      color: #1db954;

      .link {
        color: #1db954;
      }

      .playback {
        @apply block;
      }
    }
  }

  .cell {
    @apply flex flex-1 items-center relative mr-2;

    &.--playback, &.--addition {
      max-width: 40px;
    }

    &.--added-at {
      max-width: 100px;
    }

    &.--duration {
      max-width: 60px;
    }

    /* .explicit-label {
      @apply ml-1 p-1 border
    } */
  }
}
</style>
