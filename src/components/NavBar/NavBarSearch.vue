<template>
  <form class="w-40 ml-4 relative text-sm">
    <input
      class="h-6 m-0 pr-5 pl-2 mt-2 bg-gray-500 rounded-3xl outline-none text-white dark:bg-white dark:text-black"
      type="search"
      placeholder="Search"
      aria-label="Search"
      @focus="onFocus"
      @keyup="onKeyUp"
    >
    <button class="absolute -right-2 top-0 bottom-0 h-4 my-auto mx-0 outline-none pointer-events-none">
      <icon icon="carbon:search" />
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Icon from '/~/components/Icon.vue'
import { ActionTypes as SearchActionTypes } from '/~/store/search/actions'
import _ from 'lodash'

export default defineComponent({
  components: {
    Icon,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const onFocus = (e: { target: { value: any } }) => {
      const { name, params: { query } } = route
      const { value } = e.target

      if (value)
        router.push({ name: 'search-result', params: { query: value } })
      else if (name !== 'search' && !query)
        router.push('/search')
    }

    const keyUp = (e: { target: { value: any } }) => {
      const { value } = e.target

      if (value !== '') {
        router.replace({
          name: 'search-result',
          params: { query: value },
        })
      }
      else {
        router.replace('/search')
      }
      store.dispatch(`SearchModule/${SearchActionTypes.SEARCH}`, value)
    }

    const onKeyUp = _.throttle(keyUp, 500)

    return {
      onFocus,
      onKeyUp,
    }
  },
})
</script>
