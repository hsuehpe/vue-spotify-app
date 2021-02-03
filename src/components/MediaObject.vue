<template>
  <div :class="elClass">
    <router-link tag="div" :to="createUrl()" class="media-object__cover">
      <img
        v-if="coverImg[0]"
        v-lazy="coverImg[0].url"
        :alt="name + '-cover'"
        class="media-object__cover-inner"
      >
      <div v-else class="media-object__cover-inner" />
      <div class="media-object__cover-hover">
        <Icon class="media-object__play" icon="el-play-alt" @click="onPlay" />
        <Icon class="media-object__sound-on" icon="akar-icons:sound-on" />
        <Icon class="media-object__sound-off" icon="akar-icons:sound-off" />
        <Icon class="media-object__pause" icon="el-pause-alt" @click="onPause" />
      </div>
    </router-link>
    <div class="media-object__info">
      <div>
        <router-link class="media-object__name" :to="createUrl()">
          {{ name }}
        </router-link>

        <router-link
          v-for="(artist, index) in artists"
          v-if="artists"
          :key="artist.id"
          class="media-object__artist"
          :to="{ name: 'artist', params: { id: artist.id } }"
        >
          {{ artist.name }}
          <template v-if="index !== artists.length - 1">
            ,&nbsp;
          </template>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  id: {
    required: true,
  },
  uri: {
    required: true,
  },
  coverImg: {
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    required: true,
  },
  artists: {
    required: false,
  },
})
</script>

<style scoped>
.media-object:hover .media-object__play {
  @apply block;
}

.media-object--active .media-object__name {
  color: #1db954;
}

.media-object--playing .media-object__sound-on {
  @apply block;
}

.media-object--playing:hover .media-object__pause {
  @apply block;
}

.media-object__pause

.media-object--playing:hover .media-object__play,
.media-object--playing:hover .media-object__sound-on {
  display: none;
}

.media-object__play {
  display: none;
}

.media-object__pause, .media-object__sound-on {
  display: none;
}

.media-object__cover {
  min-width: 130px;
  padding-top: 100%;
  @apply relative;
}

.media-object__cover:hover .media-object__cover-hover {
  background: rgba(0, 0, 0, .6);
}

.media-object__cover-inner {
  @apply absolute top-0 w-full h-full bg-gray-50;
}

.media-object__cover-hover {
  @apply block absolute top-0 w-full h-full;
}

.media-object__cover-hover > div {
  @apply top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white outline-none text-3xl;
}

.media-object__info {
  @apply mt-1 text-xs leading-5;
}

.media-object__name {
  @apply text-white cursor-pointer;
}

.media-object__name:hover {
  @apply underline;
}

.media-object__artist {
  @apply text-gray-500 no-underline;
}

.media-object__artist:hover {
  @apply text-white underline;
}

.media-object__avatar {
  background-color: #737575;
  @apply relative w-full h-full;
}

.media-object__music-icon {
  @apply top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 h-2/5;
}

</style>
