<template>
  <div class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <router-view />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useStore } from './store'

export default defineComponent({
  setup() {
    const store = useStore()
    const getters = store.getters
    const accessToken = getters.getAccessToken

    const initApp = () => {
      if (!accessToken)
        store.dispatch('loginUser')
    }
    initApp()
  },
})
</script>
