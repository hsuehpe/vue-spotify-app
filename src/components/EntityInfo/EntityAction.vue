<template>
  <div :class="elClass">
    <v-button
      :on-click="onPlay"
      class="btn play"
    >
      Play
    </v-button>
    <v-button
      :on-click="onPause"
      class="btn pause"
    >
      Pause
    </v-button>
    <template v-if="type === 'playlist'">
      <v-button
        :on-click="onFollow"
        class="btn follow"
        is-black="true"
      >
        Follow
      </v-button>
      <v-button
        :on-click="onUnfollow"
        class="btn unfollow"
        is-black="true"
      >
        Unfollow
      </v-button>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch, onMounted, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ActionTypes as UserActionTypes } from '/~/store/user/actions'
import playerApi from '/~/api/spotify/player'
import followApi from '/~/api/spotify/follow'
import vButton from '/~/components/VButton.vue'

export default defineComponent({
  components: {
    vButton,
  },
  props: {
    uri: {
      type: String,
      required: true,
    },
    playlistID: {
      type: String,
      required: true,
    },
    ownerID: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const isFollowing = ref(false)

    const store = useStore()
    const getters = store.getters

    const route = useRoute()

    const user = getters['UserModule/getProfile']
    const playbackContext = computed(() => getters['PlayerModule/getPlaybackContext'])
    const mediaPlaying = computed(() => playbackContext.value && playbackContext.value.context.uri && playbackContext.value.context.uri.includes(props.id))

    const elClass = computed(() => ['entity-action', { playing: mediaPlaying, following: isFollowing.value }])

    watch(() => route.params, async(newParams) => {
      init()
    })

    const onPlay = () => {
      if (playbackContext.value.context.uri === props.uri)
        playerApi.play()
      else
        playerApi.play(props.uri)
    }

    const onPause = () => {
      playerApi.pause()
    }

    const onFollow = async() => {
      try {
        await followApi.followPlaylist(
          props.playlistID,
        )
        isFollowing.value = !isFollowing.value
        store.dispatch(`UserModule/${UserActionTypes.CLEAR_USER_PLAYLISTS}`)
        store.dispatch(`UserModule/${UserActionTypes.GET_CURRENT_USER_PLAYLISTS}`)
      }
      catch (e) {
        console.log(e)
      }
    }

    const onUnfollow = async() => {
      try {
        await followApi.unfollowPlaylist(
          props.playlistID,
        )
        isFollowing.value = !isFollowing.value

        store.dispatch(`UserModule/${UserActionTypes.CLEAR_USER_PLAYLISTS}`)
        store.dispatch(`UserModule/${UserActionTypes.GET_CURRENT_USER_PLAYLISTS}`)
      }
      catch (e) {
        console.log(e)
      }
    }

    const checkIfUserFollowPlaylist = async(playlistID: string, ids: string) => {
      try {
        const res = await followApi.checkIfUserFollowPlaylist(playlistID, ids)
        isFollowing.value = res.data[0]
      }
      catch (e) {
        console.log(e)
      }
    }

    const init = () => {
      checkIfUserFollowPlaylist(
        props.playlistID,
        user.id,
      )
    }

    onMounted(() => {
      init()
    })

    return {
      elClass,
      onPlay,
      onPause,
      onFollow,
      onUnfollow,
    }
  },
})

</script>

<style lang="postcss" scoped>
.entity-action {
  @apply flex pt-4 pb-3;
  &.playing {
    .play {
      @apply hidden;
    }

    .pause {
      @apply block;
    }
  }

  &.following {
    .follow {
      @apply: hidden;
    }

    .unfollow {
      @apply block;
    }
  }
}
</style>
