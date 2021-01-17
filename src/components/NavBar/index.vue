<template>
  <nav class="h-10 flex bg-white dark:bg-black relative">
    <nav-bar-history />
    <nav-bar-search />
    <nav-bar-nav />
  </nav>
</template>

<script setup lang="ts">
import NavBarHistory from './NavBarHistory.vue'
import NavBarSearch from './NavBarSearch.vue'
import NavBarNav from './NavBarNav.vue'

</script>
