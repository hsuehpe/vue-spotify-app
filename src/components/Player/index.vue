<template>
  <div class="player">
    <div v-if="playback" class="inner">
      <current-track class="left" />
      <div class="center">
        <player-controls />
        <player-playback />
      </div>
      <div class="right">
        <device-picker />
        <volume-bar />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import VolumeBar from './VolumeBar.vue'
import CurrentTrack from './CurrentTrack.vue'
import PlayerControls from './PlayerControls.vue'
import PlayerPlayback from './PlayerPlayback.vue'
import DevicePicker from './DevicePicker.vue'

export default defineComponent({
  components: {
    VolumeBar,
    CurrentTrack,
    PlayerControls,
    PlayerPlayback,
    DevicePicker,
  },
  setup() {
    const store = useStore()
    const getters = store.getters
    const playback = computed(() => getters['PlayerModule/getPlayback'])

    return {
      playback,
    }
  },
})
</script>

<style lang="postcss" scoped>
.player {
  @apply fixed bottom-0 w-full h-24 z-20;
  background-color: #242729;

  .inner {
    @apply flex items-center h-full;
  }

  .left {
    @apply w-1/3;
  }

  .right {
    @apply flex w-1/3;

    .device-picker {
      @apply mr-1 ml-auto;
    }

    .volume-bar {
      @apply mr-4 ml-1;
    }
  }

  .center {
    @apply w-1/3;
  }
}
</style>
