<template>
  <div v-if="playbackContext" class="player-playback">
    <div class="time">
      {{ msToMinutes(data.progress) }}
    </div>
    <div class="progress-bar">
      <vue-slider
        v-model="data.progress"
        :max="data.songDuration"
        :tooltip="false"
        :dot-size="15"
        :process-style="{ background: '#1db954' }"
        @drag-start="onDragStart"
        @dragging="onDragging"
        @change="onProcessChange"
        @drag-end="onDragEnd"
      />
    </div>
    <div class="time">
      {{ msToMinutes(data.songDuration ) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import playerApi from '/~/api/spotify/player'
import { msToMinutes } from '/~/logics/time-format'
import VueSlider from 'vue-slider-component'

export default defineComponent({
  components: {
    VueSlider,
  },
  setup() {
    const store = useStore()
    const getters = store.getters
    const playback = computed(() => getters['PlayerModule/getPlayback'])
    const playbackContext = computed(() => getters['PlayerModule/getPlaybackContext'])
    const isPlaying = computed(() => getters['PlayerModule/isPlaying'])
    const data = reactive({
      progress: 0,
      draggingValue: 0,
      progressInterval: null as any,
      isDragStart: false,
      songDuration: 0,
    })

    const updateProgress = () => {
      clearInterval(data.progressInterval)
      data.progress = playbackContext.value.position

      if (!playbackContext.value.paused) {
        data.progressInterval = setInterval(() => {
          if (playback.value && data.progress + 1000 <= data.songDuration)
            data.progress = data.progress + 1000
        }, 1000)
      }
    }

    const onDragStart = () => {
      data.isDragStart = true
    }

    const onDragging = (currentValue: number) => {
      data.draggingValue = currentValue
    }

    const onDragEnd = () => {
      data.isDragStart = false
      playerApi.seekToPosition(data.draggingValue)
    }

    const onProcessChange = (currentValue: number) => {
      if (!data.isDragStart) {
        data.isDragStart = false
        playerApi.seekToPosition(currentValue)
      }
    }

    watch(() => playback.value, () => {
      data.songDuration = playback.value.item.duration_ms
    })

    watch(() => playbackContext.value, () => {
      data.progress = playbackContext.value.position
    })

    watch(() => isPlaying.value, () => {
      updateProgress()
    })

    onMounted(() => {
      updateProgress()
      data.songDuration = playback.value.item.duration_ms
    })

    return {
      data,
      playback,
      playbackContext,
      msToMinutes,
      onDragStart,
      onDragging,
      onDragEnd,
      onProcessChange,
    }
  },
})
</script>

<style lang="postcss" scoped>
.player-playback {
  @apply flex w-full;

  .time {
    @apply text-white text-sm px-2;
  }

  .progress-bar {
    @apply w-full;
  }
}
</style>
