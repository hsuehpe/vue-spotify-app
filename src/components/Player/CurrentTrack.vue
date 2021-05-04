<template>
  <div class="current-track">
    <div class="cover">
      <router-link :to="createUrlForCover(playback.value.context)">
        <img
          class="img"
          :src="playback.value.item.album.images[2].url"
        />
      </router-link>
    </div>

    <div class="info">
      <router-link
        class="name"
        :to="{ name: 'album', params: { id: playback.value.item.album.id } }"
      >
        {{ playback.value.item.name }}
      </router-link>
      <track-addition
        :track-id="data.currentTrackID"
        :is-saved="isSavedTrack"
        @update-tracks-status="onTrackUpdate"
      />

      <div class="artists">
        <router-link
          v-for="(artist, index) in playback.value.item.artists"
          :key="index"
          class="link"
          :to="{ name: 'artist', params: { id: artist.id }}"
        >
          {{ artist.name }}
          <template v-if="index !== playback.value.item.artists.length - 1">
            ,&nbsp;
          </template>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, watch, onMounted } from 'vue'
import TrackAddition from '/~/components/TrackAddition.vue'
import libraryApi from '/~/api/spotify/library'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    TrackAddition,
  },
  setup() {
    const store = useStore()
    const getters = store.getters
    const playback = computed(() => getters['PlayerModule/getPlayback'])

    const data = reactive({
      currentTrackID: '',
      isSavedTrack: false,
    })

    const checkSavedTrack = async(id: string) => {
      try {
        const res = await libraryApi.checkUserSavedTracks(id)
        data.isSavedTrack = res.data[0]
      }
      catch (e) {
        console.log(e)
      }
    }

    const createUrlForCover = (context: object) => {
      if (context) {
        const chunks = context.uri.split(':')
        const route = { name: context.type }

        switch (context.type) {
          case 'playlist':
            Object.assign(route, {
              params: {
                user_id: chunks[2],
                playlist_id: chunks[chunks.length - 1],
              },
            })
            break
          case 'album':
          case 'artist':
            Object.assign(route, {
              params: { id: chunks[chunks.length - 1] },
            })
            break
        }
        return route
      }
      else {
        return {}
      }
    }

    const onTrackUpdate = (id: string) => {
      checkSavedTrack(id)
    }

    watch(() => playback, () => {
      if (data.currentTrackID !== playback.value.item.id)
        data.currentTrackID = playback.value.item.id

      checkSavedTrack(data.currentTrackID)
    })

    onMounted(() => {
      data.currentTrackID = playback.value.item.id
      checkSavedTrack(data.currentTrackID)
    })

    return {
      createUrlForCover,
      playback,
    }
  },
})
</script>

<style lang="postcss" scoped>
.current-track {
  @apply flex items-center;

  .cover {
    @apply w-14 h-14 my-0 mx-4;
  }

  .img {
    @apply w-full;
  }

  .info {
    @apply relative overflow-hidden pr-5 whitespace-nowrap overflow-ellipsis;

    .track-addition {
      @apply absolute right-0 top-0.5;
    }
  }

  .name {
    @apply text-white text-sm;

    &:hover {
      @apply underline;
    }
  }

  .artists {
    @apply overflow-hidden whitespace-nowrap overflow-ellipsis py-1 px-0 text-xs;
  }

  .link {
    &:hover {
      @apply text-gray-300 underline;
    }
  }
}
</style>