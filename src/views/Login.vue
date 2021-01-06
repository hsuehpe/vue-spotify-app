<template>
  Loading...
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ActionTypes } from '/~/store/auth/actions'

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

</script>
