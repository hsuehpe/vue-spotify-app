<template>
  <div class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <not-found v-if="notFound" />
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ActionTypes } from '/~/store/auth/actions'
import { useStore } from 'vuex'
import NotFound from '/~/views/NotFound.vue'

const store = useStore()
const getters = store.getters
const accessToken = getters['AuthModule/getAccessToken']
const notFound = ref(false)

const initApp = () => {
  if (!accessToken)
    store.dispatch(`AuthModule/${ActionTypes.LOGIN_USER}`, undefined)
}
initApp()

</script>
