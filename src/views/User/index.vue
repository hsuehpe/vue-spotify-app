<template>
  <div class="flex flex-col items-center" @vScroll="loadMore">
    <img v-if="!!(state.user.images && state.user.images[0])" :src="state.user.images[0].url" class="relative rounded-full w-52 h-52 mt-8">
    <div v-else class="relative rounded-full w-52 h-52 mt-8 text-9xl">
      <Icon icon="carbon-user-avatar-filled" />
    </div>
    <h1 class="text-3xl">
      {{ state.user.display_name }}
    </h1>
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
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import usersApi from '/~/api/spotify/users'
import playlistsApi from '/~/api/spotify/playlists'
import { ActionTypes as AppActionTypes } from '/~/store/app/actions'
import playlists from '/~/api/spotify/playlists'
import InfiniteLoading from 'vue-infinite-loading'
import MediaObject from '/~/components/MediaObject.vue'

const store = useStore()
const route = useRoute()

const userID = route.params.id

const state = reactive({
  user: '',
  userID: '',
  playlists: {
    limit: 25,
    offset: 0,
    total: 1,
    items: [] as object[],
  },
  isMore: false,
})

const playlistItems = computed(() => {
  return state.playlists.items
})

const getUser = async(id: string | string[] | null) => {
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

  if (ev.detail.scrollbarV.percent > 70) {
    state.isMore = true
    getUserPlaylists(state.userID)
  }
}

getUser(userID)
getUserPlaylists(userID)

</script>
