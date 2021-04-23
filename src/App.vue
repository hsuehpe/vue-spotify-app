<template>
  <div class="text-gray-700 dark:text-gray-200">
    <not-found v-if="notFound" />
    <div v-else>
      <nav-bar />
      <router-view class="mt-10" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ActionTypes as AppActionTypes } from '/~/store/app/actions'
import { ActionTypes as PlayerActionTypes } from '/~/store/player/actions'
import { useStore } from 'vuex'
import NotFound from '/~/views/NotFound.vue'
import NavBar from '/~/components/NavBar/index.vue'

export default defineComponent({
  components: {
    NotFound,
    NavBar,
  },
  setup() {
    const store = useStore()
    const getters = store.getters
    const accessToken = getters['AuthModule/getAccessToken']
    const notFound = ref(false)

    const initApp = () => {
      if (accessToken) store.dispatch(`AppModule/${AppActionTypes.INIT}`)
      store.dispatch(`PlayerModule/${PlayerActionTypes.INIT}`)
    }
    initApp()

    return {
      notFound,
    }
  },
})

</script>

<style>

* {
  box-sizing: border-box;
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
</style>
