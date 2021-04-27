<template>
  <infinite-loader
    :more="loadMore"
  >
    <div>
      <div class="flex flex-col items-center">
        <img v-if="!!(state.user.images && state.user.images[0])" :src="state.user.images[0].url" class="relative rounded-full w-52 h-52 mt-8">
        <div v-else class="relative rounded-full w-52 h-52 mt-8 text-9xl">
          <icon icon="carbon-user-avatar-filled" />
        </div>
        <h1 class="text-3xl">
          {{ state.user.display_name }}
        </h1>
      </div>
      <div class="flex flex-wrap py-4 bg-black">
        <media-object
          v-for="item in playlistItems"
          :id="item.id"
          :key="item.id"
          :uri="item.uri"
          :cover-img="item.images"
          :name="item.name"
          :type="item.type"
        />
      </div>
    </div>
  </infinite-loader>
</template>

<script lang="ts">
import { reactive, computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import usersApi from '/~/api/spotify/users'
import playlistsApi from '/~/api/spotify/playlists'
import { ActionTypes as AppActionTypes } from '/~/store/app/actions'
import MediaObject from '/~/components/MediaObject.vue'
import InfiniteLoader from '/~/components/InfiniteLoader.vue'
import Icon from '/~/components/Icon.vue'

interface User {
  images: Array<object>
  display_name: string
}

interface PlaylistItem {
  id: string
  uri: string
  images: Array<object>
  name: string
  type: string
}

export default defineComponent({
  components: {
    Icon,
    InfiniteLoader,
    MediaObject,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const userID = route.params.id

    const state = reactive({
      user: {} as User,
      userID: '',
      playlists: {
        limit: 25,
        offset: 0,
        total: 1,
        items: [] as Array<PlaylistItem>,
      },
      isMore: false,
    })

    const playlistItems = computed(() => {
      return state.playlists.items
    })

    const getUser = async(id: string) => {
      try {
        const res = await usersApi.getUserProfile(id)
        state.user = res.data
      }
      catch (e) {
        store.dispatch(`AppModule/${AppActionTypes.SET_NOT_FOUND}`, true)
      }
    }

    const getUserPlaylists = async(id: string | string[] | null) => {
      try {
        if (state.playlists.total > state.playlists.offset) {
          const res = await playlistsApi.getUserPlaylists(id, state.playlists.offset, state.playlists.limit)

          state.playlists.offset = res.data.offset + state.playlists.limit
          state.playlists.total = res.data.total
          const items = res.data.items
          state.playlists.items.push(...items)
          state.isMore = false
        }
      }
      catch (e) {
        console.log(e)
      }
    }

    const loadMore = (ev: { detail: { scrollbarV: { percent: number } } }) => {
      if (state.isMore) return false
      console.log('load more !!')
      state.isMore = true
      getUserPlaylists(userID)
    }

    getUser(userID)

    return {
      state,
      playlistItems,
      loadMore,
    }
  },
})

</script>
