<template>
  <div class="album-view">
    <div>
      <entity-info
        v-if="data.album"
        :cover-img="data.album.images"
        :type="data.album.type"
        :name="data.album.name"
        :description="data.album.description"
        :artists="data.album.artists"
        :uri="data.album.uri"
      />
      <tracks-list
        v-if="data.album && data.tracks"
        :tracks="data.tracks"
        :show-artists="true"
        :context-uri="data.album.uri"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ActionTypes as AppActionTypes } from '/~/store/app/actions'
import albumsApi from '/~/api/spotify/albums'
import EntityInfo from '/~/components/EntityInfo/index.vue'
import TracksList from '/~/components/TracksList.vue'

export default defineComponent({
  components: {
    EntityInfo,
    TracksList,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const data = reactive({
      albumID: '',
      album: {
        images: [],
        type: '',
        name: '',
        description: '',
        artists: {},
        uri: '',
      },
      tracks: null,
    })

    const getAlbum = async(albumID: string|string[]) => {
      try {
        const res = await albumsApi.getAlbum(albumID)
        data.album = res.data
      }
      catch (e) {
        store.dispatch(`AppModule/${AppActionTypes.SET_NOT_FOUND}`)
      }
    }

    const getAlbumTracks = async(albumID: string|string[]) => {
      try {
        const res = await albumsApi.getAlbumTracks(albumID)
        data.tracks = res.data.items
      }
      catch (e) {
        store.dispatch(`AppModule/${AppActionTypes.SET_NOT_FOUND}`)
      }
    }

    const loadMore = () => {
      console.log('load more')
    }

    onMounted(() => {
      const { id: albumID } = route.params
      getAlbum(albumID)
      getAlbumTracks(albumID)
    })

    return {
      data,
      loadMore,
    }
  },
})
</script>
