<template>
  <div :class="elClass">
    <Icon class="btn play" icon="el-play-alt" @click.prevent="play" />
    <Icon class="btn sound-on" icon="akar-icons:sound-on" />
    <Icon class="btn pause" icon="el-pause-alt" @click.prevent="pause" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import playerApi from '/~/api/spotify/player'

export default defineComponent({
  props: {
    trackUri: {
      type: String,
      required: true,
    },
    tracksUris: {
      type: Array,
      required: false,
      default: () => [],
    },
    contextUri: {
      type: String,
      required: false,
      default: '',
    },
    offset: {
      type: Number,
      required: false,
      default: 0,
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
      console.log(props)
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
  .btn {
    @apply h-6 w-6 text-2xl;
  }

  .pause, .sound-on {
    @apply hidden;
  }

  .--active {
    .play, .pause {
      @apply hidden;
    }

    .sound-on {
      @apply inline-block;
    }
  }

  .--active:hover {
    .play, .sound-on {
      @apply hidden;
    }
    .pause {
      @apply inline-block;
    }
  }

  .--paused:hover {
    .pause, .sound-on {
      @apply hidden;
    }
    .play {
      @apply inline-block;
    }
  }
}
</style>
