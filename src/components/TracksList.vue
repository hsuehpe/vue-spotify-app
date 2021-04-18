<template>
  <div v-if="tracks" class="tracks-list">
    <div
      v-for="(item, index) in tracks"
      :key="index"
      :class="isActiveTrack(item)"
    >
      <div v-if="item.album" class="cell">
        <img
          class="img"
          :src="item.album.images[2].url"
          :alt="item.album.name"
        >

        <div class="cell index">
          <span class="index-text">{{ index + 1 }}</span>
          <track-playback
            :track-uri="item.uri"
            :tracks-uris="tracksUris"
            :context-uri="contextUri"
            :offset="index"
          />
        </div>

        <div class="cell">
          <track-addition
            :track-id="item.id"
            :is-saved="data.savedTracks[index]"
            @update-track-status="onTrackUpdate"
          />
        </div>

        <div class="cell name">
          {{ item.name }}
          <span v-if="item.artists && showArtists">
            &nbsp;-&nbsp;
            <router-link
              v-for="(artist, index) in item.artists"
              :key="artist.id"
              class="link"
              :to="{ name: 'artist', params: { id: artist.id } }"
            >
              {{ artist.name }}
              <template v-if="index !== item.artists.length - 1">
                ,&nbsp;
              </template>
            </router-link>
          </span>
        </div>

        <div
          v-if="item.explicit"
          class="cell explicit"
        >
          <span class="explicit label">Explicit</span>
        </div>

        <div class="cell duration">
          {{ msToMinutes(item.duration_ms) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, onUpdated } from 'vue'
import { useStore } from 'vuex'
import TrackAddition from '/~/components/TrackAddition.vue'
import TrackPlayback from '/~/components/TrackPlayback.vue'
import libraryApi from '/~/api/spotify/library'
import { msToMinutes } from '/~/logics/time-format'

interface Image {
  url: string
}

interface Album {
  images: Array<Image>
  name: string
}

interface Artist {
  id: string
  name: string
}

interface Track {
  name: string
  id: string
  album: Album
  artists: Array<Artist>
  uri: string
  explicit: string
  duration_ms: number
}

export default defineComponent({
  components: {
    TrackAddition,
    TrackPlayback,
  },
  props: {
    tracks: {
      type: Array as () => Array<Track>,
      required: true,
    },
    showArtists: {
      type: Boolean,
      default: false,
    },
    contextUri: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const store = useStore()
    const getters = store.getters
    const playbackContext = computed(() => getters['PlayerModule/getPlaybackContext'])
    const playback = computed(() => getters['PlayerModule/getPlayback'])
    const tracksUris = computed(() => props.tracks ? props.tracks.map(el => el.uri) : [])

    const data = reactive({
      tracksIds: [] as string[],
      savedTracks: [],
    })

    const fetchTrackIds = () => {
      if (props.tracks) data.tracksIds = props.tracks.map(el => el.id)
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

    const isActiveTrack = (current: { id: any }) => {
      const isActiveTrack = playback.value.item && playback.value.item.id === current.id

      return {
        row: true,
        '--active': isActiveTrack,
        '--paused': isActiveTrack && playbackContext.value && playbackContext.value.paused,
      }
    }

    const onTrackUpdate = () => {
      checkSavedTracks()
    }

    onUpdated(() => {
      fetchTrackIds()
      checkSavedTracks()
    })

    return {
      data,
      tracksUris,
      isActiveTrack,
      onTrackUpdate,
      msToMinutes,
    }
  },
})
</script>
<style lang="postcss" scoped>
  .tracks-list {
    @apply px-4 py-0;

    .track-playback {
      @apply hidden;
    }

    .link:hover {
      @apply underline;
    }

    .row {
      @apply relative flex text-sm leading-4 border-gray-300 border-b;

      &:first-of-type {
        @apply border-t border-gray-300;
      }

      &:hover {
        &:not(&.--active) {
          @apply bg-gray-300;
        }

        .track-playback {
          @apply block;
        }

        .index-text {
          @apply hidden;
        }
      }

      &.--active {
        .index-text {
          @apply hidden;
        }

        .track-playback {
          @apply block;
        }
      }
    }

    .cell {
      @apply flex items-center;

      &:not(:first-of-type) {
        @apply my-0 mx-2;
      }

      &.index {
        @apply my-0 mx-1;
        min-width: 35px;
      }

      &.name {
        @apply w-full;
      }

      & > .img {
        @apply w-10 h-10;
      }
    }

    .explicit-label {
      @apply p-1 border-gray-300 border-b rounded-sm text-gray-200 text-xs leading-none tracking-wide uppercase;
    }
  }
</style>
