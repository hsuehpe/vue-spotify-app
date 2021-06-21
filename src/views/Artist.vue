<template>
  <infinite-loader
    :more="loadMore"
  >
    <div class="artist-view">
      <div class="content">
        <entity-info
          v-if="data.artist"
          :cover-img="data.artist.images"
          :type="data.artist.type"
          :name="data.artist.name"
          :uri="data.artist.uri"
          :followers="data.artist.followers.total"
        />
        <entity-header title="Popular" :small="true" />
        <tracks-list v-if="data.tracks.length" :tracks="data.tracks" />
        <div v-if="data.albums.items.length > 0" class="flex flex-wrap py-4">
          <media-object
            v-for="(item, index) in data.albums.items"
            :id="item.id"
            :key="index"
            :uri="item.uri"
            :cover-img="item.images"
            :name="item.name"
            :artists="item.artists"
            :type="item.type"
          />
        </div>
      </div>
    </div>
  </infinite-loader>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import EntityInfo from '/~/components/EntityInfo/index.vue'
import EntityHeader from '/~/components/EntityHeader.vue'
import TracksList from '/~/components/TracksList.vue'
import MediaObject from '/~/components/MediaObject.vue'
import InfiniteLoader from '/~/components/InfiniteLoader.vue'
import artistsApi from '/~/api/spotify/artists'
import { ActionTypes as AppActionTypes } from '/~/store/app/actions'

interface Followers {
  href: object
  total: number
}

interface Artist {
  images: Array<object>
  type: string
  name: string
  uri: string
  followers: Followers
}

interface AlbumItem {
  uri: string
  name: string
  type: string
  album_group: string
  artists: Array<object>
  href: string
  id: string
  images: Array<object>
}

export default defineComponent({
  components: {
    EntityInfo,
    EntityHeader,
    TracksList,
    MediaObject,
    InfiniteLoader,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const data = reactive({
      artistID: '' as string | string[],
      artist: {
        images: [],
        type: '',
        name: '',
        uri: '',
        followers: {
          total: 0,
          href: null,
        },
      },
      tracks: [],
      albums: {
        limit: 25,
        offset: 0,
        total: 1,
        items: [] as Array<AlbumItem>,
      },
      isMore: false,
    })

    const getArtist = async(artistID: string|string[]) => {
      try {
        const res = await artistsApi.getArtist(artistID)
        data.artist = res.data
      }
      catch (e) {
        store.dispatch(`AppModule/${AppActionTypes.SET_NOT_FOUND}`)
      }
    }

    const getArtistAlbums = async(artistID: string|string[]) => {
      try {
        if (data.albums.total > data.albums.offset) {
          const res = await artistsApi.getArtistAlbums(
            artistID,
            'album,single',
            data.albums.offset,
            data.albums.limit,
          )
          data.albums.offset = res.data.offset + data.albums.limit
          data.albums.total = res.data.total
          data.albums.items.push(...res.data.items)
          data.isMore = false
        }
      }
      catch (e) {
        console.log(e)
      }
    }

    const getArtistTopTracks = async(artistID: string|string[]) => {
      try {
        const res = await artistsApi.getArtistTopTracks(
          artistID,
          'TW',
        )
        data.tracks = res.data.tracks
      }
      catch (e) {
        console.log(e)
      }
    }

    const loadMore = () => {
      if (data.isMore) return false
      data.isMore = true
      getArtistAlbums(data.artistID)
    }

    const init = () => {
      const { id: artistID } = route.params
      data.artistID = artistID
      getArtist(artistID)
      getArtistTopTracks(artistID)
    }

    onMounted(() => {
      init()
    })

    return {
      loadMore,
      data,
    }
  },
})
</script>
