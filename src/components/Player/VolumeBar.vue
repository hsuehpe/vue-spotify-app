<template>
  <div class="volume-bar">
    <icon class="btn" :icon="volumeIcon()" @click="onButtonClick" />
    <div class="slider-wrapper">
      <vue-slider
        v-model="data.volume"
        :tooltip="false"
        :dot-size="15"
        :dot-style="{ background: '#fff' }"
        :process-style="{ background: '#1db954' }"
        :bg-style="{ background: '#737575', width: '80px' }"
        @drag-start="onDragStart"
        @dragging="onDragging"
        @change="onSliderChange"
        @drag-end="onDragEnd"
      ></vue-slider>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import Icon from '/~/components/Icon.vue'
import VueSlider from 'vue-slider-component'
import playerApi from '/~/api/spotify/player'

export default defineComponent({
  components: {
    VueSlider,
    Icon,
  },
  setup() {
    const store = useStore()
    const getters = store.getters
    const playback = computed(() => getters['PlayerModule/getPlayback'])
    const data = reactive({
      volume: 0,
      tmpVolume: 0,
      draggingValue: 0,
      dragStartVolume: 0,
    })

    const volumeIcon = () => data.volume ? 'akar-icons:sound-on' : 'akar-icons:sound-off'

    const setVolume = (val: number) => {
      try {
        playerApi.volume(val)
      }
      catch (e) {
        console.log(e)
      }
    }

    const onButtonClick = () => {
      if (data.volume > 0) {
        data.tmpVolume = data.volume
        data.volume = 0
      }
      else {
        data.volume = data.tmpVolume
      }

      setVolume(data.volume)
    }

    const onDragStart = (currentValue: number) => {
      data.dragStartVolume = currentValue
    }

    const onDragging = (currentValue: number) => {
      data.draggingValue = currentValue
    }

    const onDragEnd = () => {
      setVolume(data.draggingValue)
    }

    const onSliderChange = (currentValue: number) => {
      const diff = Math.abs(data.dragStartVolume - currentValue)

      if (diff >= 10) {
        data.dragStartVolume = currentValue
        setVolume(currentValue)
      }
    }

    watch(() => playback.value, (newVal) => {
      data.volume = newVal.device.volume_percent
    })

    onMounted(() => {
      data.volume = playback.value.device.volume_percent
    })

    return {
      data,
      volumeIcon,
      onButtonClick,
      onDragStart,
      onDragging,
      onSliderChange,
      onDragEnd,
    }
  },
})
</script>

<style lang="postcss" scoped>
.volume-bar {
  @apply flex;
  .slider-wrapper {
    @apply w-24;
  }

  .btn {
    @apply mr-1 cursor-pointer outline-none text-white text-2xl;

    &:hover {
      @apply text-gray-300;
    }
  }
}
</style>
