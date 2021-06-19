<template>
  <div class="track-addition">
    <button
      v-if="!isSaved"
      title="Save to your library"
      @click="saveTrack"
    >
      <icon icon="ant-design:plus-outlined" />
    </button>
    <button
      v-else
      class="--remove"
      title="Remove from your library"
      @click="removeTrack"
    >
      <icon class="icon-saved" icon="ant-design:check-outlined" />
      <icon class="icon-remove" icon="clarity-times-line" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/~/components/Icon.vue'
import { useStore } from 'vuex'
import { ActionTypes as LibraryActionTypes } from '/~/store/library/actions'
import libraryApi from '/~/api/spotify/library'

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    trackId: {
      type: String,
      required: true,
      default: '',
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['saved-track-remove', 'update-track-status'],
  setup(props, { emit }) {
    const store = useStore()
    const getters = store.getters

    const saveTrack = async() => {
      try {
        await libraryApi.saveTracks([props.trackId])
        store.dispatch(`LibraryModule/${LibraryActionTypes.SAVE_TRACK}`, props.trackId)
        emit('update-track-status', props.trackId)
      }
      catch (e) {
        console.log(e)
      }
    }

    const removeTrack = async() => {
      try {
        await libraryApi.removeTracks([props.trackId])
        store.dispatch(`LibraryModule/${LibraryActionTypes.REMOVE_TRACK}`, props.trackId)
        emit('saved-track-remove', props.trackId)
        emit('update-track-status', props.trackId)
      }
      catch (e) {
        console.log(e)
      }
    }

    return {
      saveTrack,
      removeTrack,
    }
  },
})
</script>

<style lang="postcss" scoped>
.track-addition {
  @apply inline-block leading-none;

  button {
    color: #959595;
    @apply outline-none text-lg;
    &:hover {
      @apply text-black;
    }

    &.--remove {
      .icon-remove {
        @apply hidden;
      }
      &:hover {
        .icon-saved {
          @apply hidden;
        }

        .icon-remove {
          @apply block;
        }
      }
    }
  }
}
</style>
