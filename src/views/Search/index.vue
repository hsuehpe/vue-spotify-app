<template>
  <div class="search-view">
    <div v-if="!state.query" class="info">
      Find your favorite songs, artists, albums and playlists.
    </div>
    <nav-view v-if="state.query" :links="navLinks" />
    <div v-if="isNoResultVisible" class="info">
      No result found for <strong>{{ state.query }}</strong>
      <div>
        Please make sure your words are spelled correctly or use less of
        different keywords.
      </div>
    </div>
    <span v-if="isLoadingData"> Loading ... </span>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import NavView from '/~/components/NavView.vue'

export default defineComponent({
  components: {
    NavView,
  },
  setup() {
    const store = useStore()
    const state = store.state.SearchModule
    const isLoadingData = computed(() => {
      console.log(state)
      return (
        state.isLoading
        || state.tracksIsLoading
        || state.albumsIsLoading
        || state.artistsIsLoading
        || state.playlistsIsLoading
      )
    })

    console.log(isLoadingData)

    const isTracksExists = computed(() => {
      return (
        state.result && state.result.tracks && state.result.tracks.total > 0
      )
    })

    const isPlaylistsExists = computed(() => {
      return (
        state.result
        && state.result.playlists
        && state.result.playlists.total > 0
      )
    })

    const isAlbumsExists = computed(() => {
      return (
        state.result && state.result.albums && state.result.albums.total > 0
      )
    })

    const isArtistsExists = computed(() => {
      return (
        state.result && state.result.artists && state.result.artists.total > 0
      )
    })

    const isResult = computed(() => {
      return (
        isTracksExists.value
        || isAlbumsExists.value
        || isPlaylistsExists.value
        || isArtistsExists.value
      )
    })

    const isNoResultVisible = computed(() => {
      return (
        !isResult.value && state.query && state.isLoading
      )
    })

    const navLinks = computed(() => {
      return [
        {
          to: { name: 'search-result', params: { query: state.query } },
          name: 'Top results',
        },
        {
          to: { name: 'search-track', params: { query: state.query } },
          name: 'Tracks',
          isVisible: isTracksExists.value,
        },
        {
          to: { name: 'search-playlist', params: { query: state.query } },
          name: 'Playlists',
          isVisible: isPlaylistsExists.value,
        },
        {
          to: { name: 'search-album', params: { query: state.query } },
          name: 'Albums',
          isVisible: isAlbumsExists.value,
        },
        {
          to: { name: 'search-artist', params: { query: state.query } },
          name: 'Artists',
          isVisible: isArtistsExists.value,
        },
      ]
    })

    return {
      state,
      isLoadingData,
      navLinks,
      isNoResultVisible,
    }
  },
})
</script>

<style lang="postcss" scoped>
.content {
  height: calc(100vh - 14rem);
}
</style>
