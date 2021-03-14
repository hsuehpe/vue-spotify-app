<template>
  <div class="playlist-view" v-scroll @vScroll="loadMore">
    <div class="playlist-view__content">
    </div>
  </div>
</template>

<script setup lang="ts">
import playlistsApi from '/~/api/spotify/playlists'
import EntityInfo from '/~/components/EntityInfo'


</script>