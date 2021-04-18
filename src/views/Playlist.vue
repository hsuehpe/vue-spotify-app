<template>
  <div class="playlist-view" @vScroll="loadMore">
    <div class="content">
      <entity-info
        v-if="playlist"
        :cover-img="playlist.images"
        :type="playlist.type"
        :name="playlist.name"
        :description="playlist.description"
        :followers="playlist.followers.total"
        :uri="playlist.uri"
        :playlist-id="data.playlistID"
        :owner-id="playlist.owner.id"
      />
      <tracks-table v-if="data.tracks && data.tracks.items.length > 0" :tracks="data.tracks.items" :context-uri="playlist.uri" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import playlistsApi from '/~/api/spotify/playlists'
import { ActionTypes as AppActionTypes } from '/~/store/app/actions'
import { ActionTypes as PlaylistActionTypes } from '/~/store/playlist/actions'
import EntityInfo from '/~/components/EntityInfo/index.vue'
import TracksTable from '/~/components/TracksTable.vue'

interface Tracks {
  total: number
  offset: number
  limit: number
  items: Array<any>
}

export default defineComponent({
  components: {
    EntityInfo,
    TracksTable,
  },
  setup(prop) {
    const store = useStore()
    const getters = store.getters
    const playlist = computed(() => getters['PlaylistModule/getPlaylist'])
    const route = useRoute()

    const data = reactive({
      userID: '',
      playlistID: '' as string | string[],
      tracks: {
        limit: 50,
        offset: 0,
        total: 1,
        items: [],
      } as Tracks,
      more: false,
    })

    const initData = () => {
      data.tracks = {
        limit: 50,
        offset: 0,
        total: 1,
        items: [],
      }
    }

    const getPlaylistTracks = async(playlistID: string | string[]) => {
      try {
        if (data.tracks.total > data.tracks.offset) {
          const res = await playlistsApi.getPlaylistsTracks(
            playlistID,
            data.tracks.offset,
            data.tracks.limit,
          )

          data.tracks.offset = res.data.offset + data.tracks.limit
          data.tracks.total = res.data.total
          data.tracks.items.push(...res.data.items)
          data.more = false
        }
      }
      catch (e) {
        store.dispatch(`AppModule/${AppActionTypes.SET_NOT_FOUND}`)
      }
    }

    const loadMore = (ev: { detail: { scrollbarV: { percent: number } } }) => {
      if (data.more) return false

      if (ev.detail.scrollbarV.percent > 70) {
        data.more = true
        getPlaylistTracks(data.playlistID)
      }
    }

    const init = () => {
      const { playlist_id: playlistID } = route.params
      data.playlistID = playlistID || ''
      initData()
      getPlaylistTracks(playlistID)
      store.dispatch(`PlaylistModule/${PlaylistActionTypes.FETCH_PLAYLIST}`, playlistID)
    }

    watch(() => route.params, async(newVal) => {
      if (newVal.playlist_id) init()
    })

    onMounted(() => {
      init()
    })

    return {
      data,
      playlist,
      loadMore,
    }
  },
})

</script>
