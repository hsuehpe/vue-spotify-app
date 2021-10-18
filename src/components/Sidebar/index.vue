<template>
  <div class="sidebar">
    <infinite-loader
      :more="loadMore"
    >
      <sidebar-nav :links="browse" />
      <sidebar-nav title="Library" :links="library" />
      <sidebar-nav title="Playlists" :links="playlists.items" />
    </infinite-loader>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import InfiniteLoader from '/~/components/InfiniteLoader.vue'
import SidebarNav from '/~/components/Sidebar/SidebarNav.vue'
import { ActionTypes as UserActionTypes } from '/~/store/user/actions'

export default defineComponent({
  components: {
    InfiniteLoader,
    SidebarNav,
  },
  setup() {
    const store = useStore()
    const getters = store.getters
    const playlists = computed(() => getters['UserModule/getPlaylists'])
    const browse = computed(() => {
      return [{
        type: 'browse',
        name: 'Browse',
      }]
    })
    const library = computed(() => {
      return [
        {
          type: 'tracks-collection',
          name: 'Songs',
        },
        {
          type: 'albums-collection',
          name: 'Albums',
        },
        {
          type: 'artists-collection',
          name: 'Artists',
        },
      ]
    })

    const loadMore = () => {
      console.log('sidebar loadmore')
      store.dispatch(`UserModule/${UserActionTypes.GET_CURRENT_USER_PLAYLISTS}`)
    }

    return {
      playlists,
      browse,
      library,
      loadMore,
    }
  },
})
</script>

<style lang="postcss" scoped>
.sidebar {
  @apply w-48 pt-8;
}
</style>
