<template>
  Loading...
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ActionTypes } from '/~/store/auth/actions'

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const getTokenFromURL = () => {
      const { code }: any = route.query || ''
      const isToken = /^[AQ]{2}/.test(code)

      if (isToken) store.dispatch(`AuthModule/${ActionTypes.SET_CREDENTIALS}`, { code })

      router.push('/')
    }

    getTokenFromURL()
  },
})

</script>
