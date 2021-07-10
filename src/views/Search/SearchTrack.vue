<template>
  <infinite-loader
    :more="getTracks"
  >
    <tracks-list :tracks="state.tracks.items" />
  </infinite-loader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { ActionTypes as SearchActionTypes } from '/~/store/search/actions'
import InfiniteLoader from '/~/components/InfiniteLoader.vue'
import TracksList from '/~/components/TracksList.vue'

export default defineComponent({
  components: {
    InfiniteLoader,
    TracksList,
  },
  setup() {
    const store = useStore()
    const state = store.state.SearchModule

    const getTracks = () => {
      store.dispatch(`SearchModule/${SearchActionTypes.GET_TRACKS}`)
    }

    return {
      state,
      getTracks,
    }
  },
})
</script>
