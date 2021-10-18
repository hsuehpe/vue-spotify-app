<template>
  <div v-if="!!tracks.length" class="tracks-table">
    <div class="row header">
      <div class="cell --playback" />
      <div class="cell --addition" />
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
        Added At
      </div>
      <div class="cell duration">
        <icon icon="ant-design:clock-circle-filled" class="text-base" />
      </div>
    </div>
    <div
      v-for="(item, index) in tracks"
      :key="index"
      class="row"
      :class="isActiveTrack(item.track)"
      :data-id="item.track.id"
    >
      <div class="cell --playback">
        <track-playback
          :track-uri="item.track.uri"
          :tracks-uris="data.tracksUris"
          :context-uri="contextUri"
          :offset="index"
        />
      </div>

      <div class="cell --addition">
        <track-addition
          :track-id="(item.track.id) ? item.track.id : ''"
          :is-saved="data.savedTracks[item.track.id]"
          @update-track-status="onTrackUpdate"
          @saved-track-remove="onSavedTrackRemove"
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
import { defineComponent, reactive, ref, computed, watch } from 'vue'
import moment from 'moment'
import { msToMinutes } from '/~/logics/time-format'
import { useStore } from 'vuex'
import TrackAddition from './TrackAddition.vue'
import TrackPlayback from './TrackPlayback.vue'
import Icon from '/~/components/Icon.vue'
import libraryApi from '/~/api/spotify/library'
import { TracksTableItem } from '/~/types'


export default defineComponent({
  components: {
    Icon,
    TrackPlayback,
    TrackAddition,
  },
  props: {
    tracks: {
      type: Array as () => Array<TracksTableItem>,
      required: true,
      default: () => [],
    },
    type: {
      type: String,
      default: '',
    },
    contextUri: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    const store = useStore()
    const getters = store.getters
    const playback = computed(() => getters['PlayerModule/getPlayback'])
    const playbackContext = computed(() => getters['PlayerModule/getPlaybackContext'])

    const data = reactive({
      tracksUris: [] as Array<string>,
      tracksIds: [] as Array<string>,
      savedTracks: {} as any,
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

    const isActiveTrack = (current: TrackItem) => {
      const isActiveTrack = playback.value.item && playback.value.item.id === current.id
      return {
        '--active': isActiveTrack,
        '--paused': isActiveTrack && playbackContext && playbackContext.value.paused,
      }
    }

    const onTrackUpdate = (trackId: string) => {
      checkSavedTracks([trackId])
    }

    const onSavedTrackRemove = (id: string) => {
      if (props.type === 'library')
        document.querySelectorAll(`[data-id=${id}]`)[0].remove()
    }

    watch(ref(props.tracks).value, () => {
      if (props.tracks.length > data.tracksIds.length) {
        checkSavedTracks(props.tracks.slice(data.tracksIds.length).map((el) => {
          return el.track.id
        }))
      }

      fetchTrackIds()
      fetchTrackUris()
    }, { immediate: true })

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
    &:hover {
      @apply underline;
    }
  }

  .row {
    min-height: 40px;
    @apply flex relative p-2 text-black text-xs font-semibold;

    &:hover {
      &:not(:first-of-type) {
        @apply bg-gray-200;
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
  }
}
</style>
