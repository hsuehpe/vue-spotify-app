<template>
  <div :class="elClass">
    <div class="cover">
      <img
        v-if="coverImg[0]"
        class="cover-img"
        :src="coverImg[0].url"
        alt="cover"
      >
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
        :playlist-id="playlistId"
        :uri="uri"
        :owner-id="ownerID"
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

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import EntityAction from './EntityAction.vue'
import { CoverImg, Artist } from '/~/types'

export default defineComponent({
  components: {
    EntityAction,
  },
  props: {
    uri: {
      type: String,
      required: true,
    },
    playlistId: {
      type: String,
      required: false,
      default: '',
    },
    coverImg: {
      type: Array as () => Array<CoverImg>,
      required: true,
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
      default: '',
    },
    author: {
      type: String,
      required: false,
      default: '',
    },
    artists: {
      type: Array as () => Array<Artist>,
      required: false,
      default: [],
    },
    followers: {
      type: [Number, String],
      required: false,
      default: null,
    },
    ownerID: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    const store = useStore()
    const getters = store.getters
    const user = getters['UserModule/getProfile']

    const elClass = computed(() => ['entity-info', { editable: props.ownerID === user.id && props.type === 'playlist' }])

    return {
      user,
      elClass,
    }
  },
})

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
      @apply relative w-2/5 bg-[#333] min-w-[150px] max-w-[200px] max-h-[200px];
      box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, .4);
    }

    .info {
      @apply flex flex-col justify-end w-3/5 p-4;
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
      &:hover {
        @apply underline;
      }
    }
  }
</style>
