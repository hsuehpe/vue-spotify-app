<template>
  Loading...
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '../../store'

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore()
    const state = store.state
    const getters = store.getters
    const route = useRoute()
    const router = useRouter()

    const getTokenFromURL = () => {
      const { code } = route.query
      const isToken = /^[AQ]{2}/.test(code)

      if (isToken) store.dispatch('GET_TOKEN', { code })
    }

    getTokenFromURL()
  },
})
</script>
