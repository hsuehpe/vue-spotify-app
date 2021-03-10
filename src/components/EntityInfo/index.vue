<template>
  <div :class="elClass">
    <div class="cover">
      <img
        v-if="coverImg[0]"
        class="cover-img"
        :src="coverImg[0].url"
        alt="cover"
      >
      <Icon class="cover-icon" icon="heroicons-solid:music-note" />
      <div
        class="cover-hover"
        title="Edit image"
        @click="onCoverClick"
      >
        <Icon class="cover-icon" icon="fa-solid:edit" />
      </div>
    </div>

    <div class="info">
      <div class="type">
        {{ type }}
      </div>
      <h2 class="name">
        {{ name }}
      </h2>
      <p
        v-if="description"
        class="desc"
      >
        {{ description }}
      </p>

      <div v-if="artists" class="artists">
        By
        <router-link
          v-for="(artist, index) in artists"
          :key="index"
          class="link"
          :to="{ name: 'artist', params: { id: artist.id } }"
        >
          {{ artist.name }}
          <template v-if="index !== artists.length - 1">
            ,&nbsp;
          </template>
        </router-link>
      </div>

      <div v-if="author" class="author">
        Author: {{ author }}
      </div>
      <entity-action
        v-if="type === 'playlist'"
        :type="type"
        :playlist-i-d="playlistID"
        :uri="uri"
        :owner-i-d="ownerID"
      />
    </div>

    <div
      v-if="followers"
      class="followers"
    >
      <div>Followers</div>
      {{ followers }}
    </div>
    <playlist-update-modal v-if="ownerID === user.id && type === 'playlist'" />
  </div>
</template>

<script setup="props" lang="ts">
import { defineProps, computed } from 'vue'
import { useStore } from 'vuex'
import PlaylistUpdateModal from '@/components/PlaylistUpdateModal.vue'
import EntityAction from './EntityAction.vue'

const store = useStore()
const getters = store.getters
const user = getters['UserModule/getProfile']

const props = defineProps({
  uri: {
    required: true,
  },
  playlistID: {
    type: String,
    required: false,
  },
  coverImg: {
    type: Array,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  artists: {
    type: Array,
    required: false,
  },
  followers: {
    type: [Number, String],
    required: false,
  },
  ownerID: {
    type: String,
    required: false,
  },
})

const elClass = computed(() => ['entity-info', { editable: props.ownerID === user.id && props.type === 'playlist' }])

const onCoverClick = () => {
  this.$modal.show('playlist-update-modal')
}

</script>

<style lang="postcss" scoped>
  .entity-info {
    @apply flex relative p-4 text-xs;

    &.editable {
      .cover:hover {
        .cover-icon {
          @apply: hidden;
        }

        .cover-hover {
          @apply block;
        }
      }
    }

    .cover {
      @apply relative w-2/5;
      background: #333;
      min-width: 150px;
      max-width: 200px;
      max-height: 200px;
      box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, .4);
    }

    .cover-icon {
      @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 h-2/5;
    }

    .cover-hover {
      @apply hidden absolute top-0 z-10 w-full h-full cursor-pointer;
      background: rgba(0, 0, 0, 0.7);
    }

    .info {
      @apply flex flex-col justify-end w-3/5 py-4;
    }

    .type {
      @apply text-xs uppercase;
    }

    .name {
      @apply my-3 text-3xl;
    }

    .desc, .artist {
      @apply text-gray-300;
    }

    .followers {
      @apply block absolute right-4 bottom-4 text-gray-300 leading-4;
      & .text {
        @apply text-right uppercase;
      }
    }

    .link, a {
      @apply text-white;
      &:hover {
        @apply underline;
      }
    }
  }
</style>
