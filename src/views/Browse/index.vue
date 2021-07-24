<template>
  <div class="browse-view">
    <ul class="nav">
      <router-link
        exact
        tag="li"
        :to="{ name: 'browse-genres' }"
        class="nav-item"
        active-class="--active"
      >
        Genres & Moods
      </router-link>
      <router-link
        exact
        tag="li"
        :to="{ name: 'browse-new-releases' }"
        class="nav-item"
        active-class="--active"
      >
        New releases
      </router-link>
    </ul>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="postcss" scoped>

.browse-view {
  @apply p-2 overflow-auto;

  .nav {
    @apply flex py-4 px-0 justify-center;
  }

  .nav-item {
    @apply relative my-0 mx-4 text-base uppercase cursor-pointer;

    &:hover {
      @apply text-green-300;
    }

    &.--active {
      @apply font-bold;
    }
  }

  .content {
    @apply py-4 px-0;
  }
}

</style>
