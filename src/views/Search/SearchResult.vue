<template>
  <div>
    <template v-if="isTracksExists">
      <entity-header
        title="Tracks"
        :small="true"
        @click="goTo('search-track')"
      />
      <tracks-list :tracks="getTracks" />
    </template>
    <template v-if="isPlaylistsExists">
      <entity-header
        title="Playlists"
        :small="true"
        @click="goTo('search-playlist')"
      />

      <div class="flex flex-wrap py-4">
        <media-object
          v-for="(playlist, index) in state.playlists.items.slice(maxResults)"
          :id="playlist.id"
          :key="index"
          :uri="playlist.uri"
          :cover-img="playlist.images"
          :name="playlist.name"
          :type="playlist.type"
        />
      </div>
    </template>
    <template v-if="isAlbumsExists">
      <entity-header
        title="Albums"
        :small="true"
        @click="goTo('search-album')"
      />

      <div class="flex flex-wrap py-4">
        <media-object
          v-for="(album, index) in state.albums.items.slice(maxResults)"
          :id="album.id"
          :key="index"
          :uri="album.uri"
          :cover-img="album.images"
          :name="album.name"
          :artists="album.artists"
          :type="album.type"
        />
      </div>
    </template>

    <template v-if="isArtistsExists">
      <entity-header
        title="Artists"
        :small="true"
        @click="goTo('search-artist')"
      />

      <div class="flex flex-wrap py-4">
        <media-object
          v-for="(artist, index) in state.artists.items.slice(maxResults)"
          :id="artist.id"
          :key="index"
          :uri="artist.uri"
          :cover-img="artist.images"
          :name="artist.name"
          :type="artist.type"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import MediaObject from '/~/components/MediaObject.vue'
import TracksList from '/~/components/TracksList.vue'
import EntityHeader from '/~/components/EntityHeader.vue'

export default defineComponent({
  components: {
    TracksList,
    MediaObject,
    EntityHeader,
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const state = store.state.SearchModule
    const maxResults = 12

    const isTracksExists = computed(() => {
      return state.tracks && state.tracks.total > 0
    })

    const isAlbumsExists = computed(() => {
      return state.albums && state.albums.total > 0
    })

    const isArtistsExists = computed(() => {
      return state.artists && state.artists.total > 0
    })

    const isPlaylistsExists = computed(() => {
      return state.playlists && state.playlists.total > 0
    })

    const getTracks = computed(() => {
      return state.tracks && state.tracks.items
        ? Object.keys(state.tracks.items)
          .slice(0, 5)
          .map((key: any) => ({ ...state.tracks.items[key] }))
        : []
    })

    const goTo = (name: string) => {
      router.push({ name, params: { query: state.query } })
    }

    return {
      goTo,
      maxResults,
      state,
      isTracksExists,
      isAlbumsExists,
      isArtistsExists,
      isPlaylistsExists,
      getTracks,
    }
  },
})
</script>
