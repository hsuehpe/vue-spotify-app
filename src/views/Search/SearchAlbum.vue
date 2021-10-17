<template>
  <infinite-loader
    :more="getAlbums"
  >
    <div class="flex flex-wrap p-4">
      <media-object
        v-for="album in state.albums.items"
        :id="album.id"
        :key="album.id"
        :uri="album.uri"
        :cover-img="album.images"
        :name="album.name"
        :artists="album.artists"
        :type="album.type"
      />
    </div>
  </infinite-loader>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { ActionTypes as SearchActionTypes } from '/~/store/search/actions'
import InfiniteLoader from '/~/components/InfiniteLoader.vue'
import MediaObject from '/~/components/MediaObject.vue'

export default defineComponent({
  components: {
    InfiniteLoader,
    MediaObject,
  },
  setup() {
    const store = useStore()
    const state = store.state.SearchModule
    const getAlbums = () => {
      store.dispatch(`SearchModule/${SearchActionTypes.GET_ALBUMS}`)
    }

    return {
      state,
      getAlbums,
    }
  },
})
</script>
