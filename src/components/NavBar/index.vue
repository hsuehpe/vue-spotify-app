<template>
  <nav class="h-10 w-full z-50 flex bg-white dark:bg-black fixed top-0">
    <nav-bar-history />
    <nav-bar-search />
    <nav-bar-nav />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBarHistory from './NavBarHistory.vue'
import NavBarSearch from './NavBarSearch.vue'
import NavBarNav from './NavBarNav.vue'

export default defineComponent({
  components: {
    NavBarHistory,
    NavBarSearch,
    NavBarNav,
  },
})

</script>
