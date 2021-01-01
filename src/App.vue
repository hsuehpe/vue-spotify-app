<template>
  <div class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ActionTypes } from '/~/store/auth/actions'
import { useStore } from 'vuex'

const store = useStore()
const getters = store.getters
const accessToken = getters.getAccessToken

const initApp = () => {
  if (!accessToken)
    store.dispatch(ActionTypes.LOGIN_USER, undefined)
}
initApp()

</script>
