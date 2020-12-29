<template>
  Loading...
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '/~/store'
import { ActionTypes } from '/~/store/auth/actions'

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore()
    const state = store.state
    const getters = store.getters
    const route = useRoute()
    const router = useRouter()

    const getTokenFromURL = () => {
      const { code }: any = route.query || ''
      const isToken = /^[AQ]{2}/.test(code)

      if (isToken) store.dispatch(ActionTypes.GET_TOKEN, { code })

      router.push('/')
    }

    getTokenFromURL()
  },
})
</script>
