<template>
  <infinite-loader
    :more="getPlaylists"
  >
    <div class="flex flex-wrap p-4">
      <media-object
        v-for="item in state.playlists.items"
        :id="item.id"
        :key="item.id"
        :uri="item.uri"
        :cover-img="item.images"
        :name="item.name"
        :type="item.type"
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
    const getPlaylists = () => {
      store.dispatch(`SearchModule/${SearchActionTypes.GET_PLAYLISTS}`)
    }

    return {
      state,
      getPlaylists,
    }
  },
})
</script>
