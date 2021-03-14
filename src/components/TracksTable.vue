<template>
  <div v-if="!!tracks.length" class="tracks-table">
    <div class="row header">
      <div class="cell playback" />
      <div class="cell addition" />
      <div class="cell name">
        Title
      </div>
      <div class="cell artist">
        Artist
      </div>
      <div class="cell album">
        Album
      </div>
      <div class="cell added-at">
        <Icon icon="bx-bxs-calendar " />
      </div>
      <div class="cell duration">
        <Icon icon="ant-design:clock-circle-filled" />
      </div>
    </div>
    <div class="row"
      v-for="(item, index) in tracks"
      :key="index"
      :class="isActiveTrack(item.track)"
      :data-id="item.track.id"
    >
      <div class="cell playback"></div>
    </div>
  </div>
</template>

<script setup="props" lang="ts">

</script>

<style lang="postcss" scoped>

</style>
