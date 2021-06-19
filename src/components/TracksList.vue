<template>
  <div v-if="tracks" class="tracks-list">
    <div
      v-for="(item, index) in tracks"
      :key="index"
      :class="isActiveTrack(item)"
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
      <div v-if="item.album" class="cell">
        <img
          class="img"
          :src="item.album.images[2].url"
          :alt="item.album.name"
        >
      </div>

      <div class="cell">
        <track-addition
          :track-id="item.id"
          :is-saved="data.savedTracks[item.id]"
          @update-track-status="onTrackUpdate"
        />
      </div>

      <div class="cell name">
        {{ item.name }}
        <span v-if="item.artists && showArtists">
          &nbsp;-&nbsp;
          <router-link
            v-for="(artist, artistIndex) in item.artists"
            :key="artist.id"
            class="link"
            :to="{ name: 'artist', params: { id: artist.id } }"
          >
            {{ artist.name }}
            <template v-if="artistIndex !== item.artists.length - 1">
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
</template>

<script lang="ts">
import { defineComponent, computed, reactive, watch, ref } from 'vue'
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
      default: () => [],
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
      savedTracks: {} as any,
    })

    const checkSavedTracks = async(trackIds: Array<string>) => {
      try {
        const res = await libraryApi.checkUserSavedTracks(trackIds.toString())
        for (let i = 0; i < res.data.length; i++)
          data.savedTracks[trackIds[i]] = res.data[i]
      }
      catch (e) {
        console.log(e)
      }
    }

    const isActiveTrack = (current: { id: any }) => {
      const isActiveTrack = playback.value.item && playback.value.item.id === current.id

      return {
        'row': true,
        '--active': isActiveTrack,
        '--paused': isActiveTrack && playbackContext.value && playbackContext.value.paused,
      }
    }

    const onTrackUpdate = (trackId: string) => {
      checkSavedTracks([trackId])
    }

    watch(ref(props.tracks).value, () => {
      checkSavedTracks(props.tracks.map(item => item.id))
    }, { immediate: true })

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
      min-height: 40px;

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
    }

    .explicit-label {
      @apply p-1 border-gray-300 border-b rounded-sm text-gray-200 text-xs leading-none tracking-wide uppercase;
    }
  }
</style>
