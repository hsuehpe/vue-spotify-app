<template>
  <div class="sidebar-nav">
    <h2 v-if="title" class="title">
      {{ title }}
    </h2>
    <ul>
      <router-link
        v-for="(link, index) in links"
        :key="index"
        tag="li"
        class="item"
        active-class="--active"
        :to="createRoute(link)"
      >
        {{ link.name }}
        <icon
          v-if="playbackContext && playbackContext.context && playbackContext.context.uri === link.uri"
          class="icon-sound-on"
          icon="akar-icons:sound-on"
        />
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import Icon from '/~/components/Icon.vue'

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    links: {
      type: Array as () => Array<any>,
      default: () => [],
    },
  },
  setup(props) {
    const store = useStore()
    const getters = store.getters
    const playbackContext = computed(() => getters['PlayerModule/getPlaybackContext'])

    const createRoute = (item: any) => {
      const to = { name: item.type }

      switch (item.type) {
        case 'playlist': {
          Object.assign(to, {
            params: { user_id: item.owner.id, playlist_id: item.id },
          })
          break
        }
      }

      return to
    }

    return {
      createRoute,
      playbackContext,
    }
  },
})
</script>

<style lang="postcss" scoped>
.sidebar-nav {
  @apply pr-2 text-gray-300 text-sm;

  .title {
    @apply pl-6 text-xs uppercase ;
  }

  .item {
    @apply relative block mb-3 pl-6 pr-5 cursor-pointer overflow-ellipsis overflow-hidden whitespace-nowrap;
    &:hover {
      @apply text-white;
    }

    &.--active {
      &:before {
        @apply absolute left-0 h-full border-l-4;
        border-color: #1db954;
        content: '';
      }
    }

    .icon-sound-on {
      @apply absolute right-1 top-0 text-white outline-none;
    }
  }
}
</style>
