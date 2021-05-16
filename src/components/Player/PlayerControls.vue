<template>
  <div v-if="playback" class="player-controls">
    <icon :class="classesShuffle" icon="clarity-shuffle-line" @click="shuffle" />
    <icon class="controls-button" icon="ic-round-skip-previous" @click="prev" />
    <icon v-if="!playbackContext.paused" class="controls-button" icon="carbon-pause-filled" @click="pause" />
    <icon v-else class="controls-button" icon="carbon-play-filled-alt" @click="play" />
    <icon class="controls-button" icon="ic-round-skip-next" @click="next" />
    <icon :class="classesRepeat" :icon="repeatIcon" @click="repeat" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import playerApi from '/~/api/spotify/player'
import Icon from '/~/components/Icon.vue'

export default defineComponent({
  components: {
    Icon,
  },
  setup() {
    const store = useStore()
    const getters = store.getters
    const playback = computed(() => getters['PlayerModule/getPlayback'])
    const playbackContext = computed(() => getters['PlayerModule/getPlaybackContext'])
    const classesShuffle = computed(() => ['controls-button', { '--active': playbackContext.value.shuffle }])
    const classesRepeat = computed(() => ['controls-button', { '--active': playbackContext.value.repeat_mode > 0 }])
    const repeatIcon = computed(() => (playbackContext.value.repeat_mode === 2) ? 'ic-baseline-repeat-one' : 'ic-baseline-repeat')

    const next = () => {
      playerApi.nextTrack()
    }

    const prev = () => {
      playerApi.previousTrack()
    }

    const pause = () => {
      playerApi.pause()
    }

    const play = () => {
      playerApi.play()
    }

    const shuffle = () => {
      playerApi.shuffle(playbackContext.value.shuffle)
    }

    const repeat = () => {
      const states = ['off', 'context', 'track']
      const repeatState = playbackContext.value.repeat_mode
      const index = repeatState === 2 ? 0 : repeatState + 1
      playerApi.repeat(states[index])
    }

    return {
      playback,
      playbackContext,
      classesShuffle,
      classesRepeat,
      repeatIcon,
      shuffle,
      prev,
      next,
      pause,
      play,
      repeat,
    }
  },
})
</script>

<style lang="postcss" scoped>
.player-controls {
  @apply flex text-white justify-center text-sm cursor-pointer outline-none;

  .controls-button {
    @apply my-auto mx-2 text-3xl cursor-pointer outline-none;
    &:hover {
      @apply text-gray-300;
    }

    &.--active {
      color: #1db954;
    }
  }
}
</style>
