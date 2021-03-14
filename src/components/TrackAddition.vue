<template>
  <div class="track-addition">
    <button
      v-if="isSaved"
      class="button"
      title="Save to your library"
      @click="saveTrack"
    >
      <Icon icon="ant-design:plus-outlined" />
    </button>
    <button
      v-else
      class="button --revove"
      title="Remove from your library"
      @click="removeTrack"
    >
      <Icon icon="ant-design:check-outlined" />
      <Icon icon="clarity-times-line" />
    </button>
  </div>
</template>

<script lang="ts">
import { computed, watch, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { ActionTypes as LibraryActionTypes } from '/~/store/library/actions'
import libraryApi from '/~/api/spotify/library'

export default defineComponent({
  props: {
    trackID: {
      type: String,
      required: true,
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['saved-track-remove', 'update-track-status'],
  setup(props, context) {
    const store = useStore()
    const getters = store.getters
    const savedTrack = computed(() => getters['LibraryModule/getSavedTrack'])
    const removedTrack = computed(() => getters['LibraryModule/getRemovedTrack'])

    const saveTrack = async() => {
      try {
        await libraryApi.saveTracks(props.trackID)
        store.dispatch(`LibraryModule/${LibraryActionTypes.SAVE_TRACK}`, props.trackID)
      }
      catch (e) {
        console.log(e)
      }
    }

    const removeTrack = async() => {
      try {
        await libraryApi.removeTracks(props.trackID)
        store.dispatch(`LibraryModule/${LibraryActionTypes.REMOVE_TRACK}`, props.trackID)
        context.emit('saved-track-remove', props.trackID)
      }
      catch (e) {
        console.log(e)
      }
    }

    watch(() => savedTrack, (val) => {
      if (val === props.trackID) context.emit('update-track-status', val)
    })

    watch(() => removedTrack, (val) => {
      if (val === props.trackID) context.emit('update-track-status', val)
    })

    return {
      saveTrack,
      removeTrack,
    }
  },
})
</script>

<style lang="postcss" scoped>
.track-addition {
  @apply inline-block leading-none
}
</style>
