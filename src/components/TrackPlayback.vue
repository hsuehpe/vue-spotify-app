<template>
  <div :class="elClass">
    <button>
      <Icon class="play" icon="el-play-alt" @click.prevent="play" />
    </button>
    <button>
      <Icon class="sound-on" icon="akar-icons:sound-on" />
    </button>
    <button>
      <Icon class="pause" icon="el-pause-alt" @click.prevent="pause" />
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import playerApi from '/~/api/spotify/player'

export default defineComponent({
  props: {
    trackUri: {
      required: true,
    },
    tracksUris: {
      type: Array,
      required: false,
    },
    contextUri: {
      type: String,
      required: false,
    },
    offset: {
      required: false,
    },
  },
  setup(props) {
    const store = useStore()
    const getters = store.getters
    const playback = computed(() => getters['PlayerModule/getPlayback'])
    const playbackContext = computed(() => getters['PlayerModule/getPlaybackContext'])
    const isActiveTrack = computed(() => playback.value.item && playback.value.item.uri === props.trackUri)
    const isPaused = computed(() => isActiveTrack.value && playbackContext.value && playbackContext.value.paused)
    const elClass = computed(() => ['track-playback', { '--active': isActiveTrack.value, '--paused': isPaused.value }])

    const play = () => {
      if (props.contextUri) {
        playerApi.play(props.contextUri, { position: props.offset })
      }
      else if (playback.value.item && playback.value.item.uri === props.trackUri) {
        playerApi.play()
      }
      else {
        playerApi.play(
          null,
          { uri: props.trackUri },
          props.tracksUris,
        )
      }
    }

    const pause = () => {
      playerApi.pause()
    }

    return {
      elClass,
      play,
      pause,
    }
  },
})
</script>

<style lang="postcss" scoped>
.track-playback {
  .play, .pause, .sound-on {
    @apply h-6 w-6;
  }

  .play {
    @apply block;
  }

  .--active {
    .play, .pause {
      @apply hidden;
    }

    .sound-on {
      @apply block;
    }
  }

  .--active:hover {
    .play, .sound-on {
      @apply hidden;
    }
    .pause {
      @apply block;
    }
  }

  .--paused:hover {
    .pause, .sound-on {
      @apply hidden;
    }
    .play {
      @apply block;
    }
  }

  button {
    @apply w-6 h-6 text-gray-300 text-2xl outline-none;
    &:hover {
      @apply text-white;
    }
    .sound-on {
      @apply h-4 text-white text-lg;
    }
  }
}
</style>
